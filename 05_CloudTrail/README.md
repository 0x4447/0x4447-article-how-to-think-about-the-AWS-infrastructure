# CloudTrail

Also a good rule of thumb is to enable CloudTrail for you account, normally this is done if you want to get an invite on what is happening in your AWS, since CloudTrail will show you Actions taken by a user, role, or an AWS service. But most importantly is what is being logged, which is actions taken in the AWS Management Console, AWS Command Line Interface, and AWS SDKs and APIs.

The last part is what we care about, the APIs actions. They will show you all the actions triggered by API calls of various sorts. In our case we could see that GitHub tried to call CodeDeploy, but for example had the wrong credentials.