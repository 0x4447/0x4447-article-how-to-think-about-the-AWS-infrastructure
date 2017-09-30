# What is AWS Lambda

The AWS Lambda is a so called serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. 

For example: lets assume you have a peace of code that shows the time overtime the code is executed. This Lambda function on its now dose nothing, nor you have to pay to have not doing anything (completely different from EC2, where even if your server is not doing anything you have to pay for it when it is on). 

You have a bunch of options to execute this special function: you can set an interval and for example execute the function every 5 min, and log the result. Or you could attach a event generated from the AWS infrastructure, lets say a EC2 comes on-line or a user logs in the dash board. 

Or even better you can attach an API to it, and call this function with a HTTP requests. 

# This time it is not a lie

Surprisingly this time when AWS writes you don’t have to worry about the underlying hardware, because it will scale automatically, they trulls mean it! Finally that have something that is tune with what the marketing material say. 

It just feels so good saying it out loud and writing it. It is just a nice feeling not being lied to.

# Why I’m mentioning AWS Lambda before CodeDeploy?

Because this will be a crucial tool to help you make a setup to auto deploy code to multiple regions. 

If you fresh, start with Lambda

If you are fresh and new to the AWS world, and your main job is to build APIs, I would highly recommend you starting from AWS Lambda. You trulls don’t have to worry about EC2, you trulls don’t have to worry about scaling. It just works. 

But I wouldn’t interact with Lambda directly I would use a tool like https://serverless.com which with a fairly straight. Forward configuration file will configure everything on AWS for you. So you can trulls focus on coding, instead of managing the infrastructure. 

# In the end

This is just a good tool to start working with AWS, but if you need to build your own deployment, keep reading, because will need all the knowledge that we just learned to achieve what was promised to us.
