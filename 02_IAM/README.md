# IAM - Identity and Access Management

The base idea of the IAM section on AWS is to manage all the permission to different parts of the Amazon infrastructure. Meaning:

This is the place where you create accounts for user to use to log-in in to AWS with the right permissions.
This is where you can create special accounts that can be used programmatically from code and apps that you build. Basically you get an API Key that you can use in your app to do things in the AWS infrastructure

As you can see nothing special here or out of the norm, but there is one new thing that AWS introduced, and it is the idea of Roles.

Roles are basically sets of rules that other entities can assume. If you are familiar with linux, it is almost like using the su command. Where you can act as another user to performa task that you need to do temporarily for example.

In a AWS Role you can specify that the role has only access to write data to S3, another role might be able to delete users, create EC2 instances etc. Fairly standard approach that makes sense.

The thing to understand is that Roles can be applied to Users, Application (the accounts that give out only an API Key and can be used by code) or most importantly you can set a Role to a AWS service, like a EC2 instance.

And this last part is important to understand, you can give rights to a EC2 where you give that specific instance access to CloudWatch, or RDS section, or whatever else you want.

# Real Life Implications

Now that we have the basic idea of Roles explained how can you use them. You could call the AWS Security Token Service (STS) where the APIs return a set of temporary security credentials that applications can then use to sign requests to AWS service APIs. This is of course if you wanted to write your now app.

But if you are going to use someone else app, in this case the CodeDoeploy app made by AWS, thei’ll ask you to attach a specific Role to the EC2 instance which then the app will use to access AutoDeploy (the service). Similarly you’ll need to add a special Role to a AutoDeploy (the service) setup so it can actually access the EC2 instances.

To sum it up:

you need to allow a EC2 instance to access CodeDeploy
You need to allow CodeDeploy to access the EC2 instances

If I had to summarize Roles in one sentence I would write: Roles are the security glue that allows you to peace all the lego blocks together.