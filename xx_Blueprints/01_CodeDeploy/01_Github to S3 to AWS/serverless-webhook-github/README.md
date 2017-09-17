# Serverless Webhook for GitHub

This repo can be used to create a backup of each repo on GitHub, but not limited to be used as a trigger for some actions on AWS. In our case we want to deploy every time there is new code in in the master branch.

In this case you can set up code deploy to react each time the zip file on S3 gets updated.

# Env Variables

The env variables can be set in the main page of a specific lambda function. THere is no way to automate this process, meaning you have to add the following variables yourself

1. API_KEY - this a key that you have to create in your private GitHub account in the section [Personal access tokens](https://github.com/settings/tokens) and check the repo section. This way in the code we can get access to the URL with the ZIP file of a secret repo.
1. SECRET - this is a secret used to make sure that the request that we get comes from GitHub itself. This Secret must be set in the lambda function, and also used in the webhook per repo.

