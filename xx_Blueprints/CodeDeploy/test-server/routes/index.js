let express = require('express');
let request = require('request');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	1.	Make a container where we are going to pass the data
	//
	let container = {}

	//
	//	2.	FIrst get the server region
	//
	get_region(container)
		.then(function(container) {

			//
			//	->	Render the HTML page
			//
			res.render("index", {
				title: "AWS CodeDeploy Test",
				region: container.document.region,
				az: container.document.availabilityZone,
				private_ip: container.document.privateIp,
				instance_type: container.document.instanceType,
				env: process.env.TEST_ENV
			});

		}).catch(function(error) {

			return next(error);

		});

});

//   _    _ ______ _      _____  ______ _____   _____
//  | |  | |  ____| |    |  __ \|  ____|  __ \ / ____|
//  | |__| | |__  | |    | |__) | |__  | |__) | (___
//  |  __  |  __| | |    |  ___/|  __| |  _  / \___ \
//  | |  | | |____| |____| |    | |____| | \ \ ____) |
//  |_|  |_|______|______|_|    |______|_|  \_\_____/
//

//
//	Get server specification
//
//	Sit down, because it is story time.
//
//	As you can see this a weird request to a weird IP. But this
//	request will get back the region the server is running on. This
//	means that no mater where we deploy the code we will make the
//	backup in the same region on S3 where the server is from.
//
function get_region(container)
{
	return new Promise(function(resolve, reject) {

		let option = {
			url: "http://169.254.169.254/latest/dynamic/instance-identity/document",
			json: true
		}

		request.get(option, function(err, response, body) {

			//
			//	1.	Convert body in to a JSON object
			//
			container.document = body;

			//
			//	->	Move to the next section
			//
			return resolve(container)

		});

	});
}

module.exports = router;
