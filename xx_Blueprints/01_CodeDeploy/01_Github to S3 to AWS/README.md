# Where is the promised Global reach?! 

We managed to make a Auto Deployment but we are not finished yet becasue what was promissed by AWS was gloabl reach with a push of a button. Well yea, sure, one day, but untill then we have to wrtie some software, chagne our aproach, and be even more patietn. 

# The problem

If you remember, I explained the issue with AWS Regions, and how they are islolated island that ton't communicate with each other. Well we need to find a way to actually tell different Regions that there was a new commit, or that there is new code to be deployed. 

How to solve this? Well your skills are the limit, and dependign on what type of expert you are you might solve this problem in a different way then I'm doing, but sicne I'm a Software Developer, I'll be solvign this problem with some code.

# The plan 

I'm gogin to use 2 AWS Lambda functions

- One function will recive webhooks from GitHub everytime there is a new commit. The function will 
  - only react to commit to the Master brnach
  - dowload the new code from GitHub
  - save it on S3 
- The second function will
  - Listent for events hapennigni on S3
  - if a new file shows up, I grab the file and notify CodeDeploy that there is work to do. I'll notify any CodeDeploy in any Region that I care about. 
  
# You can use my code

This fodler contains two other folders which contains code that you can use in your Lambda functions, this way you don't have to write evrythign from scratch. But my code is JavaScript code, and if you prefere another language, go ahead and use whtheer AWS Lambda supports.

# Lets execute 

