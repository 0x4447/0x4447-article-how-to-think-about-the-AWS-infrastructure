# The Minimum Required to Make CodeDeploy Work

Now that we've explained the basics of roles, how can you use them? You could call the AWS Security Token Service (STS), where the APIs return a set of temporary security credentials that applications can then use to sign requests to AWS service APIs. Of course, this is done when you want to write your own app.

But if you're going to use someone else's app - in this case, the AWS' CodeDeploy app - they’ll ask you to attach a specific role to the EC2 instance, and the app will then use it to access AutoDeploy (the service). Similarly, you’ll need to add a special role to an AutoDeploy (the service) setup so it can actually access the EC2 instances.

To Sum It Up:

- You need to allow a EC2 instance to access CodeDeploy.
- You need to allow CodeDeploy to access the EC2 instances.

If I had to summarize roles in one sentence, I would write: Roles are the security glue that allows you to piece all of the Lego blocks together.

### The Service Role

This role will be used by CodeDeploy, so when you create a new "app" in the CodeDeploy UI, you can give the setup the right to perform actions on your behalf. In this case, you'll give it access to the EC2 Instances.

**Steps in Making the Service Role**

1. Go to the "Roles" section in the AWS IAM page.
2. Click "Create role".
3. From "AWS Service", select AWS CodeDeploy.
4. Go to the Next step.
5. Name the service; I use "PermissionsForCodeDeployToEC2"
6. Click Create Role.

### The Instance Role

This role will be used by all of the EC2 instances attached to CodeDeploy

**Steps for Making the Instance Role**

1. Go to the "Roles" section in the AWS IAM page.
2. Click "Create role".
3. From "AWS Service" and select "EC2".
4. Go to the Next step.
   a. Check "AmazonEC2RoleforAWSCodeDeploy".
   b. Check "AutoScalingNotificationAccessRole".
   c. Check "AdministratorAccess".
5. Go to the Next step.
6. Name the service; I use "PermissionsForEC2ToCodeDeploy".
7. Click Create Role.

### The GitHub User Policy

The user to be used on the GitHub side.

1. Go to the "Policies" section in the AWS IAM page.
2. Click "Create policy".
3. Select Create Your Own Policy.
4. Set the Policy Name; I use "GitHub"
5. Paste the [following JSON](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/blob/master/xx_Blueprints/01_CodeDeploy/00_GitHub%20to%20AWS/GitHub_Policy.json) into the "Policy Document" field.

### The GitHub User

This will be a user with only "Programmatic access", which means that we'll get an API Key and secret to be used on GitHub.com to give GitHub programmatic access to AWS.

**Steps for Making a Programmatic User**

1. Go to the "Users" section in the AWS IAM page.
2. Click "Add user".
3. Set the name to GitHub.
4. For the "Access type', select "Programmatic access".
5. Go to the Next step.
6. For the policy, attach the one we just created.
7. Go to the Next step.
8. Click Create User.
9. Save the credentials in a safe place.
