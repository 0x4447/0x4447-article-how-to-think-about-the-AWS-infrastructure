# CloudTrail

CloudTrail is a very nice debugging tool. Normally, a SysAdmin will turn this feature on to see what's happening in the AWS infrastructure, because it allows you to see who logged in, who created an EC2 instance, who deleted an RDS database, or anything else that's going on with your AWS account. Hence the name Trail. 

Another benefit of this logging tool is that any API calls from the outside will be logged here, which makes it much easier to debug integrations such as when GitHub pushes a notification to CodeDeploy. This type of insight will help you determine whether there's been an error, and if there has, what went wrong. 

# Be Aware of the Bad Description

When you create a new CloudTrail, you'll have a section called "Data events". When you read it, you'll think that CloudTrail applies only to S3 events. I made this mistake, too. Basically, this is how you should think of it:

CloudTrail will log everything but S3 events. Those can be included in the "Data events" section.

# How to Enable CloudTrail

1.  Go to S3 and create a new Bucket where all the logs will end up.
2.  Go to the CloudTrail section.
3.  Click Create Trail.
4.  Give it a name.
5.  Apply trail to all regions: keep it at Yes.
6.  Management events: Keep it at All.
7.  In the Data Events section, select Select all S3 buckets in your account.
8.  In the Storage Location, select No for Create a new S3 bucket.
9.  From the drop-down menu, select the bucket you created previously.
10. Click Create.

Additional details can be found [here](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-a-trail-using-the-console-first-time.html#creating-a-trail-in-the-console).

# Be Aware of the Delay

CloudTrail doesn't work in real time. There's a decent delay between creating an action and having the action show up in the logs. Sometimes it can take up to 15 minutes for something to show up, so be patient. Don't assume that nothing's going to happen.
