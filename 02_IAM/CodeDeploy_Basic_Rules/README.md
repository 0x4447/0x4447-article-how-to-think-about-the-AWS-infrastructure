# The minimum reguired to make CodeDeploy work

Now that we have the basic idea of Roles explained how can you use them. You could call the AWS Security Token Service (STS) where the APIs return a set of temporary security credentials that applications can then use to sign requests to AWS service APIs. This is of course if you wanted to write your now app.

But if you are going to use someone else app, in this case the CodeDoeploy app made by AWS, thei’ll ask you to attach a specific Role to the EC2 instance which then the app will use to access AutoDeploy (the service). Similarly you’ll need to add a special Role to a AutoDeploy (the service) setup so it can actually access the EC2 instances.

To sum it up:

- you need to allow a EC2 instance to access CodeDeploy
- You need to allow CodeDeploy to access the EC2 instances

If I had to summarize Roles in one sentence I would write: Roles are the security glue that allows you to peace all the lego blocks together.

### The Service Role

This is a Role that will be used by CodeDeploy, this wya when you create a new "App" in the CodeDeploy UI, you can give this setup the rights to perform actions on your behalf. In this case you'll give it access to the EC2 Instances.

**Steps to make the Service Role**

1. Go to the `Roles` section in the AWS IAM apge
1. Click `Create role`
1. From `AWS Service` select AWS CodeDeploy
1. Go to the Next step
1. Name the service. I choose to use `PermissionsForCodeDeployToEC2`
1. Click Create role

### The Instance Role

This is a Role that will be used by all the EC2 Instance attached to CodeDeploy

**Steps to make the Instance Role**

1. Go to the `Roles` section in the AWS IAM apge
1. Click `Create role`
1. From `AWS Service` select `EC2`
1. Go to the Next step
   1. Check `AmazonEC2RoleforAWSCodeDeploy`
   1. Check `AutoScalingNotificationAccessRole`
   1. Check `AdministratorAccess`
1. Go to the Next step
1. Name the service. I choose to use `PermissionsForEC2ToCodeDeploy`
1. Click Create role

### The GitHub User Policy

The user that is going to be used on the GitHub side

1. Go to the `Policies` section in the AWS IAM apge
1. Click `Create policy`
1. Select Create Your Own Policy
1. Set the Policy Name, I choose to use `GitHub`
1. Paste the [following JSON](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/blob/master/xx_Blueprints/01_CodeDeploy/00_GitHub%20to%20AWS/GitHub_Policy.json) in to the `Policy Document` field

### The GitHub User

This will be a user with only `Programmatic access`, meaninig we are going to get a API Key and secret to be used on GitHub.com to give GitHub programmatic access to AWS.

**Steps to make a Programmatic User**

1. Go to the `Users` section in the AWS IAM apge
1. Click `Add user`
1. Set the name to GitHub
1. For the `Access type` select `Programmatic access`
1. Go to the Next step
1. For the policy, attach the one that we just created above
1. Go to the Next step
1. Click Create user
1. Save the credentials in a save place.
