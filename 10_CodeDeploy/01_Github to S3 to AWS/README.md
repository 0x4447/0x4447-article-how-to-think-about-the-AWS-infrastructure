# Mutli Region Deployment

If you remember, in the [00_Regions](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/00_Regions) section I explained the issue with AWS Regions, and how they are islolated island that don't communicate with each other. This section will help you understand how to go about this Multi Region Deployment or anythign for that matter that needs to be done across region. 

# We need to be clear on one thing

Let say you want to have your site to be in multiple regions, you'll have to create the same exact configuration in each region. Evrythign needs to be identical for evrything to work. The only thing that you don't have to repate is the IAM confgiration since that is a Global resource. 

# You can use my code

This folder contains two other folders which contains code that you can use in your Lambda functions, this wey you don't have to write evrythign from scratch. But my code is JavaScript code, and if you prefere another language, go ahead and use whtheer AWS Lambda supports. I tryed to comment as much as possible so you should figure out the logic of my code and transalte it in another language that you feal more confortable with. 

# The Good

Other then settign up evrythign the same in each region, and creatgin a CodeDeploy also in each region the only thing that actually chagnes is the GitHub setup. 

# The plan 

We'll need two lambda functions to perform all the magic

### serverless-github-listner

This project is a webhook listner which will be trigered by GitHub itselfe every time there is a new commit to the repo we added the webhook for. GitHub by default react to every commit, but the code will take in cosideration only the Master branch. 

### serverless-codedeploy-trigger

This project is responsabile for listening to S3 events created by the previous function and trigerign a CodeDeployment uppon a new file upload.

# Lets Execute 

Follow the READE.md file fo each projects, where you'll learn how to start workign with Serverless and how to setup each project.

- [serverless-github-listner](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/xx_Blueprints/01_CodeDeploy/01_Github%20to%20S3%20to%20AWS/serverless-github-listner)
- [serverless-codedeploy-trigger](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/xx_Blueprints/01_CodeDeploy/01_Github%20to%20S3%20to%20AWS/serverless-codedeploy-trigger)
