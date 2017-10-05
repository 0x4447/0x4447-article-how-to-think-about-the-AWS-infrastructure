# What is AWS Lambda?

The AWS Lambda is a so-called serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. 

For example: Let's assume that you have a piece of code that shows the actual time. On its own, this Lambda function does nothing. But you don't have to pay to have it do nothing, whereas in EC2, you have to pay for the time the server is on, even when it's doing nothing. 

You have a number of options when you want to execute this special function: For example, you can set an interval, execute the function every five min, and log the result. Or you can attach an event generated from the AWS infrastructure, such as an EC2 that comes online or a user who logs in to the dashboard, etc. 

Or even better, you can attach an endpoint, turn this function on in an API, and call the function with an HTTP request. 

# This Time, It's Not a Lie

Surprisingly, when AWS writes this time, you don’t have to worry about the underlying hardware, because it will scale automatically. They truly mean it! They finally have something that's in tune with what their marketing materials say. 

It just feels so good to say it out loud and write it, too. It's a nice feeling to know you're not being lied to.

# Why am I mentioning AWS Lambda before CodeDeploy?

Because this too will be crucial when you need help making a setup to auto deploy code to multiple regions. 

# If You Can, Start with Lambda Functions

If you're new to the world of AWS, and your main job is to build APIs, I would highly recommend that you start with AWS Lambda. You truly don’t have to worry about EC2 servers or scaling. It just works. 

But I wouldn’t interact with Lambda directly. I would use a tool like https://serverless.com. This type of framework will configure everything you need, based on one configuration file that you add to the project. 

# In the End

This is a good tool to use when you start working with AWS.
