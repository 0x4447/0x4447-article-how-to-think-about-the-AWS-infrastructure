# IAM - Identity and Access Management

The base idea of the IAM section on AWS is to manage all the permission to different parts of the Amazon infrastructure. Meaning:

This is the place where you create accounts for user to use to log-in in to AWS with the right permissions.
This is where you can create special accounts that can be used programmatically from code and apps that you build. Basically you get an API Key that you can use in your app to do things in the AWS infrastructure

As you can see nothing special here or out of the norm, but there is one new thing that AWS introduced, and it is the idea of Roles.

# Roles

Roles are basically sets of rules that other entities can assume. If you are familiar with linux, it is almost like using the su command. Where you can act as another user to performa task that you need to do temporarily for example.

In a AWS Role you can specify that the role has only access to write data to S3, another role might be able to delete users, create EC2 instances etc. Fairly standard approach that makes sense.

The thing to understand is that Roles can be applied to Users, Application (the accounts that give out only an API Key and can be used by code) or most importantly you can set a Role to a AWS service, like a EC2 instance.

And this last part is important to understand, you can give rights to a EC2 Instance and then this EC2 server can access differtn parts of the AWS infrastructure. Let say you created a role that allows the EC2 isntacne to delete some files on a S3 bucket, if you were to run the AWS CLI inside that machine you wound't need to provide any credentials. The CLI will check to see waht Roles this Instacne hase, and based on that information it would allow or prevent from performing an action.

This workds thanks to the AWS Security Token Service (STS) which can grant tmporary access to different sections of AWS.
