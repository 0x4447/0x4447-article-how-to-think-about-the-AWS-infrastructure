# IAM - Identity and Access Management

The basic idea of AWS' IAM section is to manage all permissions in different parts of the Amazon infrastructure. Meaning:

1. This is where you create accounts for users to use to log in to AWS with the right permissions.
2. This is where you can create special accounts that can be used programmatically from code and apps that you build. Basically, you'll get an API Key that you can use in your app to do things in the AWS infrastructure.

As you can see, there's nothing special or out of the ordinary here, but AWS did introduce one new thing: Roles.

# Roles

Basically, roles are sets of rules that other entities can assume. If you're familiar with Linux, it's almost like using the su command. For example, the su command allows you to act as another user to perform a task that you temporarily need to do.

In an AWS role, you can specify that the role only has access to write data to S3. Another role might be able to delete users, create EC2 instances, etc. It's a fairly standard approach, and it makes sense.

It should be understood that Roles can be applied to users, applications (accounts that give out only an API Key and can be used by code), or most importantly, to an AWS service (such as an a EC2 instance).

It's very important that you understand this last part. You can give rights to an EC2 instance to allow this EC2 server to access different parts of the AWS infrastructure. Let's say you created a role that allows the EC2 instance to delete some files on an S3 bucket. If you were to run the AWS CLI inside that machine, you wouldn't need to provide any credentials. The CLI will check to see which roles this instance has, and based on that information, it would either allow or prevent the performance of an action.

This works, thanks to the AWS Security Token Service (STS) that can grant temporary access to different sections of AWS.
