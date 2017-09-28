# Serverless Codedeploy

This Lambda function is responsible for listening to S3 events and when trigered tell CodeDeploy to deploy a new version of the code committed.

# Serverless

The Serverlss framework is what I choose to use to work with AWS Lambda becasue it makes it much esiear to deploy and configure the function in one configuration file, insted of doign evrythign manualy across multiple AWS products. The quick guide to start workign with Serverless can be found [here](https://serverless.com/framework/docs/providers/aws/guide/quick-start/), but to give you even a wuicker start, you can follow the instrutions bellow to get the proejct deplyed on AWS as fast as possible, and once you have it goign you can go and learn more aobut Serverless when you have some time.

### How to add Permissions

1. Go to the IAM section
1. Create a new programmatic user, and name it for example `serverless-admin`
1. Give the user Admins rights (read more [here](https://serverless.com/framework/docs/providers/aws/guide/credentials/#creating-aws-access-keys) to find out why)
1. Copy the API Key & Secret in a safe place

### How to use the new credentials?

Since there are multiple ways to use the newely created credentials, please check out all the options under this [URL](https://serverless.com/framework/docs/providers/aws/guide/credentials/#using-aws-access-keys)

### How to install? 

You just have to instal Serverless globaly on your system

`npm install -g serverless`

### How to deploy?

The followign command will deploy the whole project to AWS Lambda

`serverless deploy -v`

### How to see the logs?

Just type this in your terminal and you should see all the logs for that specific function

`serverless logs -f autodeploy -t`
