# Multi-Region Deployment

If you remember, I explained in the [00_Regions]  section(https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/00_Regions) that AWS Regions are isolated islands that don't communicate with each other. This section will help you understand how to go about Multi-Region Deployment or anything else that needs to be done across a number of regions. 

# We Need to Be Clear About One Thing

Let's say that you want to make your site available in multiple regions. To accomplish this, create the exact same configuration in each region. For this to work, every detail has to be identical. The only thing you don't have to duplicate is the IAM configuration, as that's a Global resource. 

# You Can Use My Code

This folder contains two additional folders with code you can use in your Lambda functions. This way, you don't have to write everything from scratch. However, my code is in JavaScript code, so if you prefer to use another language, go ahead and use whatever AWS Lambda will support. I tried to add as many comments as possible to help you decipher the logic of my code and translate it into a language you might be more confortable with. 

# The Good

Other than setting up everything so all of your regions match and creating a CodeDeploy in each region, the GitHub set-up is the only aspect that actually changes. You can find it in the [serverless-github-listner] folder (https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/10_CodeDeploy/01_Github%20to%20S3%20to%20AWS/serverless-github-listner).

# Let's Execute 

For each project, follow the READE.md file to learn how to work with Serverless and how to set up each project.

- [serverless-github-listner](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/xx_Blueprints/01_CodeDeploy/01_Github%20to%20S3%20to%20AWS/serverless-github-listner)
- [serverless-codedeploy-trigger](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/xx_Blueprints/01_CodeDeploy/01_Github%20to%20S3%20to%20AWS/serverless-codedeploy-trigger)
