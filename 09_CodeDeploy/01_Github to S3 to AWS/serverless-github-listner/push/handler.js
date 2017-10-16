let fs = require("fs");
let tar = require('tar');
let https = require('https');
let crypto = require('crypto');
var rimraf = require('rimraf');
let stream = require('stream');
let unirest = require('unirest');

let aws = require('aws-sdk');

//
//  Initiate the S3 Object while specifying the region where the data is.
//
let s3 = new aws.S3({
	region: "us-east-1"
});

//
//  This Webhook will react to events created by GitHub itself. Every time
//  someone commits new code to a selected Repo, this Webhook will know
//  about it.
//
module.exports.push = function (event, context, callback) {

	//
	//  1.  Make a container that is going to be passed in the in promise
	//  	chain.
	//
	let container = {
		secret: event.headers["X-Hub-Signature"].split("=")[1],
		github_event: JSON.parse(event.body)
	}

	//
	//  2. 	Before we do anything, we check to ensure that we didn't forget
	//  	to add an Env variable with the GitHub API key.
	//
	check_if_the_api_key_is_present(container)
		.then(function(container) {

			//
			//  2.  Ensure that the Secret env variable is present.
			//
			return check_if_the_secret_is_present(container);

		}).then(function(container) {

			//
			//  2.	Validate the GitHub request by checking the Hash.
			//
			return check_if_the_request_is_from_github(container);

		}).then(function(container) {

			//
			//  2.  Ensure that we're going to deploy new code only when it
			//  	lands in the master branch.
			//
			return react_only_to_master_branch(container);

		}).then(function(container) {

			//
			//  2.  Get the owner name from the GitHub message.
			//
			return get_owner_name(container);

		}).then(function(container) {

			//
			//  3.  Get the repo name.
			//
			return get_repo_name(container);

		}).then(function(container) {

			//
			//  4.  Get the URL to the archive file on GitHub with the code.
			//
			return get_ball_url(container);

		}).then(function(container) {

			//
			//  5.  Download the repo to the tmp dir. max 500MB.
			//
			return download_the_repo_to_the_tmp_dir(container);

		}).then(function(container) {

			//
			//  6.  Create a folder for extracted code.
			//
			return make_extraction_folder(container);

		}).then(function(container) {

			//
			//  7.  Extract the archive in the above folder.
			//
			return extract_the_files(container);

		}).then(function(container) {

			//
			//  8.  Remove the parent folder.
			//
			return get_the_root_dir_from_the_extracted_repo(container);

		}).then(function(container) {

			//
			//  9.  Compress the folder in a new archive.
			//
			return recompress_the_content_of_the_extraced_folder(container);

		}).then(function(container) {

			//
			//  10.  Stream data to S3.
			//
			return stream_data_to_s3(container);

		}).then(function(container) {

			//
			//  11.  Clean up the mess before leaving.
			//
			return clean_after_the_work_is_done(container);

		}).then(function(container) {

			//
			//	1.	Create the response.
			//
			let message = {
				statusCode: 200
			};

			//
			//  ->  Tell lambda that we finished.
			//
			callback(null, message);

		}).catch(function(error) {

			//
			//  ->  Stop the code and throw the error.
			//
			callback(error);

		});

};

//  _____    _____     ____    __  __   _____    _____   ______    _____
// |  __ \  |  __ \   / __ \  |  \/  | |_   _|  / ____| |  ____|  / ____|
// | |__) | | |__) | | |  | | | \  / |   | |   | (___   | |__    | (___
// |  ___/  |  _  /  | |  | | | |\/| |   | |    \___ \  |  __|    \___ \
// | |      | | \ \  | |__| | | |  | |  _| |_   ____) | | |____   ____) |
// |_|      |_|  \_\  \____/  |_|  |_| |_____| |_____/  |______| |_____/
//

//
//	Since Lambda functions need a human to manually add all the Env Variables,
//	we need to check if all are present and the developer didn't forget
//	about something.
//
function check_if_the_api_key_is_present(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  Ensure that the API Key was added on AWS.
		//
		if(!process.env.API_KEY)
		{
			return reject(new Error("GitHub API Key is missing"));
		}

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//	Since Lambda functions need a human to manually add all the Env Variables,
//	we need to ensure that all is present and the developer didn't forget
//	about something.
//
function check_if_the_secret_is_present(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  Ensure that the API Key was added on AWS.
		//
		if(!process.env.SECRET)
		{
			return reject(new Error("The Secret is missing"));
		}

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  Each request will have a hashed secret that was added on GitHub, and is
//  sent back to us so we can make sure that the request actually came from
//  GitHub itself.
//
function check_if_the_request_is_from_github(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Convert object to a string.
		//
		let string = JSON.stringify(container.github_event)

		//
		//	2.	Convert string to a buffer.
		//
		let body = Buffer.from(string, 'utf-8');

		//
		//	2.	Hash the body with the secret.
		//
		let hash = crypto.createHmac('sha1', process.env.SECRET)
						 .update(body)
						 .digest('hex');

		//
		//	3.	Compare what GitHub sent us with what we created.
		//
		if(container.secret != hash)
		{
			return reject(new Error("You are not GitHub"));
		}

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  Get the owner name of the repo. It can be the organization name or the
//  regular user name.
//
function react_only_to_master_branch(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  Make sure we perform the work only when something
		//      changes in the master branch.
		//
		if(container.github_event.ref !== "refs/heads/master")
		{
			return reject(new Error("We work only with the Master branch"));
		}

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  Get the owner name of the repo. It can be the organization name or the
//  regular user name.
//
function get_owner_name(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  Add new data to the container.
		//
		container.owner = container.github_event.repository.owner.name;

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  Get the name of the repo that is being affected.
//
function get_repo_name(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  Add new data to the container.
		//
		container.repo_name = container.github_event.repository.name;

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  Get the URL for the site from which the zipped repository was downloaded.
//
function get_ball_url(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  Get the array that contains all the different parts of the URL, so we have clearer code.
		//
		let url_elements = [
			"https://api.github.com/",
			"repos/",
			container.owner + "/",
			container.repo_name + "/",
			"tarball/",
			"master"
		];

		//
		//  2.  Combine the URL into one long string.
		//
		let request_url = url_elements.join("");

		//
		//  3.  Make a request to GitHub to get the URL for the Zip archive.
		//
		unirest.get(request_url)
		.headers({
			'User-Agent': 'Unirest Node.js'
		})
		.followRedirect(false)
		.auth({
			user: '',
			pass: process.env.API_KEY,
			sendImmediately: true
		})
		.end(function(response) {

			//
			//	1.	Determine whether something went wrong.
			//
			if(response.code === 401)
			{
				return reject(new Error("Unable to get the ZIP url - no access"));
			}

			//
			//  1.  Add new data to the container.
			//
			container.tarball_url = response.headers.location;

			//
			//  ->  Move to the next chain.
			//
			return resolve(container);

		});

	});
}

//
//  Download the archived code to the TMP directory.
//
//  IMPORTANT
//
//  	- 	The size of the TMP dir is 500MB.
//  	- 	The TMP won't be cleared every time the function runs, so you
//  		can't rely on its state.
//
function download_the_repo_to_the_tmp_dir(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	The TMP file where we'll save the repo so we can modify
		//		the content of the archive.
		//
		let file = fs.createWriteStream("/tmp/repo.tgz");

		//
		//	2.	Download the file.
		//
		https.get(container.tarball_url, function(res) {

			//
			//	1.	Keep writing to the open file in the TMP dir.
			//
			res.on('data', function(data) {

				//
				//	1.	Write data into the file.
				//
				file.write(data);

			});

			//
			//	2.	Close the file once it's 100% downloaded.
			//
			res.on('end', function() {

				//
				//	1.	Once we have it all, we close the file.
				//
				file.end();

				//
				//  ->  Move to the next chain.
				//
				return resolve(container);

			});

		});

	});
}

//
//  Create the folder to which the content of the archive will be
//  extracted.
//
function make_extraction_folder(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	First, check to see if the folder already exists. Since it turns out
		//		that the TMP directory is some what persistent, if the function
		//		is being executed in short succession, the TMP dir remains
		//		in place. But it will be deleted if the function isn't
		//		used for a long time.
		//
		if(!fs.existsSync("/tmp/extracted"))
		{
			//
			//	1.	Make a new folder in the TMP dir.
			//
			fs.mkdirSync("/tmp/extracted");
		}

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  Extract the files.
//
function extract_the_files(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Options for the decompression.
		//
		let x_options = {
			file: "/tmp/repo.tgz",
			cwd: "/tmp/extracted"
		};

		//
		//	2.	Decompressing the file.
		//
		tar.x(x_options, function() {

			//
			//  ->  Move to the next chain.
			//
			return resolve(container);

		});

	});
}

//
//	It turns out that when GitHub compresses your repo, it creates a folder in
//	which it puts the folder's content.
//
//	Sadly, CodeDeploy won't work with nested folders; all necessary files
//	must be in the highest hierarchy.
//
//	So, we need to extract the archive and decompress the project to
//	remove the parent folder.
//
function get_the_root_dir_from_the_extracted_repo(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Read the content of the extracted folder. There should be only
		//		one folder: the folder that we want to get rid of.
		//
		let content = fs.readdirSync("/tmp/extracted");

		//
		//	2.	Add that single folder to the container.
		//
		container.folder_to_go = content[0];

		//
		//
		//
		let file = fs.readFileSync("/tmp/extracted/" + container.folder_to_go + "/README.md");

		//
		//	<> Debug
		//
		console.log(file.toString());

		//
		//  ->  Move to the next chain.
		//
		return resolve(container);

	});
}

//
//  After extracting the content of the folder, we re-compress it so
//  we can get rid of the root folder where the repo is located.
//
function recompress_the_content_of_the_extraced_folder(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Options for compression.
		//
		let options = {
			gzip: true,
			file: "/tmp/" + container.repo_name + ".tgz",
			cwd: "/tmp/extracted/" + container.folder_to_go
		};

		//
		//	2.	Read the content of the extracted folder so we can compress
		//		it again.
		//
		let path = fs.readdirSync("/tmp/extracted/" + container.folder_to_go);

		//
		//	3.	Compress mechanism.
		//
		tar.c(options, path, function() {

			//
			//  ->  Move to the next chain.
			//
			return resolve(container);

		});

	});
}

//
//  Send the repository to S3
//
function stream_data_to_s3(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Read the new compressed file.
		//
		let file = fs.createReadStream("/tmp/" + container.repo_name + ".tgz");

		//
		//	2.	Stream the file to S3.
		//
		file.pipe(stream_to_s3(container.repo_name));

		//
		//	3.	Keep track of errors.
		//
		let was_error = false;

		//
		//	4.	When there is an error, react to it and log the situation.
		//
		file.on('error', function(error) {

			//
			//	1.	Make sure that there was an error.
			//
			was_error = true;

			//
			//  ->  Stop the code and throw the error.
			//
			return reejct(error);

		});

		//
		//	5.	React, then the file is closed after everything is streamed.
		//
		file.on('close', function(){

			//
			//	1.	Only send a positive reply when there's no error.
			//
			if(!was_error)
			{
				//
				//  ->  Move to the next chain.
				//
				return resolve(container);
			}

		});

	});
}

//
//  After we finish streaming, it's necessary to clean up after ourselves, because the TMP
//  directory won't be removed immediately. It will be removed only if the
//  Lambda function won't be active for a while.
//
//  This means that we always need to clean up after ourselves.
//
function clean_after_the_work_is_done(container)
{
	return new Promise(function(resolve, reject) {

		//
		//	1.	Remove the directory to which we extract the content of the repo.
		//		If we don't do this after the work is done, the next
		//		deployment will contain old data because the files won't be
		//		overwritten.
		//
		rimraf("/tmp/extracted/", function() {

			//
			//	2.	Remove the archive downloaded from GitHub.
			//
			fs.unlinkSync("/tmp/repo.tgz");

			//
			//	3.	Remove the new archive we created to clean the dir
			//		path.
			//
			fs.unlinkSync("/tmp/" + container.repo_name + ".tgz");

			//
			//  ->  Move to the next chain.
			//
			return resolve(container);

		});

	});
}


//
//  DON'T DELETE
//
//      It would be nice to have this check, but there's currently
//      an issue with the rights to access all the buckets, and I have no time
//      to fight AWS. ;)
//
//  Check to see whether the main bucket exists on S3 for a given account.
//
function check_if_the_bucket_exists(container)
{
	return new Promise(function(resolve, reject) {

		//
		//  1.  List all buckets.
		//
		s3.listBuckets(function(req_error, data) {

			//
			//  1.  Check for an error.
			//
			if(req_error)
			{
				return reject(req_error);
			}

			//
			//  2.  Create a variable to help us understand whether the bucket
			//      we're concerned with exists.
			//
			let was_bucket_found = false;

			//
			//  3.  Loop over the buckets that we got back to see if the one we're concerned with is there.
			//
			for(let index in data.Buckets)
			{
				//
				//  1. Compare each bucket with what we want.
				//
				if("repos.dev" == data.Buckets[index].Name)
				{
					was_bucket_found = true;
				}
			}

			//
			//  4.  Check to see whether the bucket still exists before we try to save to
			//      it.
			//
			if(!was_bucket_found)
			{
				let error = new Error("The bucket with the repos disappeared");

				return reject(error);
			}

			//
			//  ->  Move to the next chain.
			//
			return resolve(container);

		});

	});
}

//  _    _   ______   _        _____    ______   _____     _____
// | |  | | |  ____| | |      |  __ \  |  ____| |  __ \   / ____|
// | |__| | | |__    | |      | |__) | | |__    | |__) | | (___
// |  __  | |  __|   | |      |  ___/  |  __|   |  _  /   \___ \
// | |  | | | |____  | |____  | |      | |____  | | \ \   ____) |
// |_|  |_| |______| |______| |_|      |______| |_|  \_\ |_____/
//

//
//  Function that streams data to Amazon S3. This means that we can use this function
//  into a .pipe() chain.
//
function stream_to_s3(repo_name)
{
	//
	//  1.  Wrap the S3 upload() function with the node.js stream.PassThrough()
	//      stream.
	//
	let pass = new stream.PassThrough();

	//
	//  2.  Create the file name to be used when saving the file.
	//
	let file_name = repo_name + ".tgz"

	//
	//  3.  Prepare the action to be performed.
	//
	let params = {
		Bucket: "repos.dev",
		Key: file_name,
		ACL: 'private',
		Body: pass,
	};


	//
	//  4.  Upload data to Amazon S3.
	//
	s3.upload(params, function(res_error, data) {

		//
		//  1.  Check for an error.
		//
		if(res_error)
		{
			throw res_error;
		}

	});

	//
	//  ->  Pass the stream to the next pipe.
	//
	return pass;
}
