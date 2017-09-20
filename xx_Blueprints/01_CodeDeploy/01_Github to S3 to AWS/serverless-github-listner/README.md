# Serverless GitHub Listner

This Lambda Function will be listeninig to any event sent by GitHub and if the event is right, it will take the new code from the Master branch and save it in to a S3 buket. basically you can think of this function as a way to make a backup of your code, which then the event of a new file on S3 can be used to perform another action.

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

# Environment Variables

This project also requires two Env Variables that can be set in the main page of the specific lambda function. 

1. **API_KEY** - this is a key that you have to create in your personal GitHub account in the  [Personal access tokens](https://github.com/settings/tokens) section. When you crate a new API Key make sure to check the box that ses `repo`. The Key will be used to access to the URL with the ZIP file of a private repo.
1. **SECRET** - this is a secret used to make sure that the request that we get comes from GitHub itself. This strign is up to you, and you'll have to use it when you add a Webhook for the selected repo.

