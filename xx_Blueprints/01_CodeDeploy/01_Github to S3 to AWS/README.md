# Where is the promised Global reach?! 

We managed to make a Auto Deployment but we are not finished yet becasue what was promissed by AWS was gloabl reach with a push of a button. Well yea, sure, one day, but untill then we have to wrtie some software, chagne our aproach, and be even more patietn. 

# The problem

If you remember, I explained the issue with AWS Regions, and how they are islolated island that ton't communicate with each other. Well we need to find a way to actually tell different Regions that there was a new commit, or that there is new code to be deployed. 

How to solve this? Well your skills are the limit, and dependign on what type of expert you are you might solve this problem in a different way then I'm doing, but sicne I'm a Software Developer, I'll be solvign this problem with some code.

# You can use my code

This fodler contains two other folders which contains code that you can use in your Lambda functions, this way you don't have to write evrythign from scratch. But my code is JavaScript code, and if you prefere another language, go ahead and use whtheer AWS Lambda supports.

# The Good

Yes, you can take and use my code, but also you can reuse the setup from the more simplicstic CodeDeploy setup. 

- The roles stay the same
- Load Balancer
- Configuration
- Autoscaling
- CodeDeploy just minor changes

Overall the big next step is to learn how to use AWS Lambda function and for that we are coing to use https://serverless.com whichi is goign to make our life much easier.

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
