let aws = require('aws-sdk');
let request = require('request');

//
//	This Webhook will react to changes that happened in a S3 bucket. This way
//	when a file receives
//
module.exports.autodeploy = (event, context, callback) => {

	//
	//	<> 	For debugging to see what type of data is exactly inside
	//		the event variable
	//
	console.log(JSON.stringify(event, null, '  '));

	//
	//	1.	Every time an event o course we save some key information needed
	//		to then perform other actions
	//
	let region = event.Records[0].awsRegion
	let bucket = event.Records[0].s3.bucket.name
	let file_name = event.Records[0].s3.object.key

	//
	//	2.	Create a CodeDeploy object while specifying the region this
	//		CodeDeploy setup was made
	//
	let codedeploy = new aws.CodeDeploy({
		region: region
	});

	//
	//	3.	Create a deployment configuration to let CodeDeploy know where
	//		to get the latest code.
	//
	//		The "description" parameter is quite useful since it will be
	//		added in to CloudTrail for easy debugging.
	//
	let params = {
		applicationName: "www",
		deploymentGroupName: "name",
		description: 'Lambda invoked CodeDeploy deployment',
		ignoreApplicationStopFailures: false,
		revision: {
			revisionType: 'S3',
			s3Location: {
				bucket: bucket,
				bundleType: "zip",
				key: file_name
			}
		}
	};

	//
	//	4.	Execute a deployment
	//
	codedeploy.createDeployment(params, function(cd_error, data) {

		//
		//	1.	Make sure to stop when there is an error
		//
		if(cd_error)
		{
			//
			//	->	Stop the function and notify the other side that there was
			//		and error.
			//
			callback(cd_error);
		}

		//
		//	2.	Create a message to let us know that all went well
		//
		let message = "---> Success!!! Deployment "
					+ data.deploymentId
					+ " is running.";

		//
		//	3.	Use console log to show the that the deployment started.
		//
		console.log(message);

		//
		//	->	Stop the function and send an empty positive response to the
		//		other side.
		//
		callback();

	});

};

