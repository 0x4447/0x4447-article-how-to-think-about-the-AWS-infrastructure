# Serverless GitHub Listener

This Lambda Function will listen to any event sent by GitHub. If the event is right, it will take the new code from the master branch and save it into an S3 bucket. Think of this function as a way to make a backup of your code. Then, in the event of a new file on S3, use the code to perform another action.

# Serverless

I choose to work with the Serverless framework in AWS Lambda because it makes it much easier to deploy and configure the function in one configuration file, rather than doing everything manually across multiple AWS products. The quick guide for working with Serverless can be found [here](https://serverless.com/framework/docs/providers/aws/guide/quick-start/), but the instructions below will deploy the project on AWS as rapidly as possible. Once you have it going, you can take the time to learn more about Serverless.

### How to Add Permissions

1. Go to the IAM section.
2. Create a new programmatic user. As an example, you could name it "serverless-admin".
3. Give the user Admin rights (read more [here] (https://serverless.com/framework/docs/providers/aws/guide/credentials/#creating-aws-access-keys) to find out why).
4. Copy the API Key and Secret to a safe place.

### How to Use the New Credentials

There are multiple ways to use the newly created credentials, so please check out all options under this [URL](https://serverless.com/framework/docs/providers/aws/guide/credentials/#using-aws-access-keys).

### How to Install 

You just have to globally install Serverless on your system:

"npm install -g serverless"

### How to Deploy

The following command will deploy the whole project to AWS Lambda:

"serverlessdeploy -v"

### How to See the Logs

Typing this in your terminal will bring up all logs for that specific function:

"serverless logs -f autodeploy -t"

# Environment Variables

This project also requires two Env Variables that can be set up in the main page of the specific Lambda function. 

1. **API_KEY** - You have to create this key in the [Personal access tokens] section of your personal GitHub account (https://github.com/settings/tokens). When you create a new API Key, be sure that you've checked the "repo" box. The key will be used to access the URL with the ZIP file of a private repo.
2. **SECRET** - This secret is used to ensure that any request we get comes from GitHub itself. The string is up to you, and you'll need to use it when you add a webhook for the selected repo.

# GitHub Setup

This is going to be straightforward.

1. Go to your repo.
2. Go to the Settings page.
3. From the left menu, select "Webhooks".
4. In the "Payload URL" input field, add the endpoint of the Lambda Function.
5. Set the "Content type" to "application/json".
6. Set a Secret to use to verify whether the webhook actually came from GitHub.
7. For the question "Which events would you like to trigger this webhook?", answer "Just the push event".
8. Check the "Active" status.

And you're done! From now on, GitHub will map a POST request to the endpoint you entered. The "Recent Deliveries" table view is a cool GitHub feature that will show all fired webhooks so you can easily debug if something goes wrong.
