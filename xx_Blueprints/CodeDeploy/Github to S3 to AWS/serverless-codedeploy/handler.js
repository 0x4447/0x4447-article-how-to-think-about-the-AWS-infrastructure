let aws = require('aws-sdk');
let request = require('request');

module.exports.autodeploy = (event, context, callback) => {

	//
	//	<> For debugging
	//
	console.log(JSON.stringify(event, null, '  '));

	//
	//	1.	Get all the necessary data from the event
	//
	let region = event.Records[0].awsRegion
	let bucket = event.Records[0].s3.bucket.name
	let file_name = event.Records[0].s3.object.key

	//
	//	2.	Create a object to CodeDeploy
	//
	let codedeploy = new aws.CodeDeploy({
		region: region
	});

	//
	//	3.	Create a configuration so code deploy knows which deployment to
	//		trigger, and which code to provide.
	//
	let params = {
		applicationName: "www",
		deploymentGroupName: "name",
		description: 'Lambda invoked codedeploy deployment',
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
	//	4.	Execute a deployment based on the data that we are going to pass
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
			callback(cd_error)
		}

		//
		//	2.	Create a message to let us know that all went well
		//
		let message = "---> Success!!! Deployment " + data.deploymentId + " is running.";

		//
		//	3.	Just to have an entry in the log that tels us that all went
		//		well/
		//
		console.log(message)

		//
		//	->	Stop the function and send an empty positive response to the
		//		other side
		//
		callback()

	});

};

