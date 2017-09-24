# It is time to trully do it

By now I trulls hope I gave you a good picture of AWS, and if you give yoursefle some time to process all of the previous information, from now on, nothing should look complicated anymore. 

But since you are goign to do this the first time, there is a good chance that the setup won't work the first time. If this happens, scrap averythign and start over. THere are meny steps in this process, and if you miss one, nothing will wokr. Give yourself time, and be patient. There is a lot to go thorough.

# Do it once, and never again 

Before we start working with CodeDeploy we need to do two things in our AWS account. We need to create 2 new Roles and 1 custom policy

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
1. Paste the bellow JSON in to the `Policy Document` field

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "codedeploy:GetDeploymentConfig",
      "Resource": "arn:aws:codedeploy:us-west-1:143651226701:deploymentconfig:*"
    },
    {
      "Effect": "Allow",
      "Action": "codedeploy:RegisterApplicationRevision",
      "Resource": "arn:aws:codedeploy:us-west-1:143651226701:application:DemoApplication"
    },
    {
      "Effect": "Allow",
      "Action": "codedeploy:GetApplicationRevision",
      "Resource": "arn:aws:codedeploy:us-west-1:143651226701:application:DemoApplication"
    },
    {
      "Effect": "Allow",
      "Action": "codedeploy:CreateDeployment",
      "Resource": "arn:aws:codedeploy:us-west-1:143651226701:deploymentgroup:DemoApplication/DemoFleet"
    }
  ]
}
```

### The GitHub User

This will be a user with only `Programmatic access`, meaninig we are going to get a API Key and secret to be used on GitHub.com to give GitHub programmatic access to AWS.

**Steps to make a Programmatic User**

1. Go to the `Users` section in the AWS IAM apge
1. Click `Add user`
1. Set the name to GitHub
1. For the `Access type` select `Programmatic access`
1. Go to the Next step
1. Attache the followign policy `Attach existing policies directly`
1. Go to the Next step
1. Click Create user
1. Save the credentials in a save place.

# Start

The result of the previous steps can be reused in your AutoDeployment, where the followign one needs to be repeated for each project you want to deploy. Meaninig let say you have a micro-servcie infrastructure, you'll have to repeate the followign steps for each micro service. Or to put it even in a differetn way, you'll have to repeat this step for each repository you have on GitHub.

The idea of the cloud is resiliance, and the ability to spin multiple servers with the same code, so the load can be split across multiple machines. In this setup we are going to have aminimum of two servers (always) thus we need a load balancer which will split the traffci betwen the servers that are gogin to be atacched to it.

### Target Group

Before we can configure the Load Balancer itself we need to create a Trget Group. This TG will be used by the Load Balancer to know to which servers the traffic should be directed. Bascially a Target Group is nothing more then a folder with a bunch of servers inside. You can group your EC2 instances, and then attach this groups to your load balancers, this way you can more easelliy manage the servers, without editign the Load Balancer itself.

**The setups to create a Load Balancer**

1. Go to the `Target Group` section in the AWS EC2 page
1. Click `Create target group`
1. Name the group
1. Keep evrythign as is
1. But expand the `Advanced health check settings` and set the followng values in the fields: 2, 2, 2, 5
1. Click Create

### Load Balancer

This is what decided how to split the traffic among all the servers that you have. 

**The setups to create a Load Balancer**

1. Go to the `Load Balancer` section in the AWS EC2 page
1. Click `Create Load Balancer`
1. Select `Application Load Balancer`
1. Set the `Name`, 
1. Select two `Availability Zones`, the EC2 that you are going to create further will have to go in the same AZ
1. Go to the next section
1. Don't bother about the HTTPS warninig (in a prodcution setup you'll want SSL enabled)
1. Go to the next section
1. Select a `Security Group`
1. Go to the next section
1. From the `Target group` from the drop down select `Existign target group`
1. From the `Name` select the Target group that you created previously
1. Go to the next section
1. Go to the next section
1. Click Create

### Launch Configurations

As you learned before from the Env Variable section. A Launch Configuration allows you to create identical EC2 instances, based on what is specified in such configuration. A LC must be created if you are going to use the Auto Scaling featire. 

A thing worth nothing, is that a Launch Configuration can be reused and applayed to different Auto Scalign Groups. This should help you name a LC in a way that will make more sense to you. Since as with AWS, most of the time you can't reneame somethign once you created it.

**IMPORTANT**: The first time you go through this setup, AWS will give you a wizzard that will help you create a Autoscalign Group with the Launch Configurations since for some reason one can't live without the other - it is romantic, but as the Load Balancer show, two things that works toghether can also be crated on their own and just be.

**The setup to create a Launch Configurations - Wizzard**

1. Go to the `Launch Configuration` section in the AWS EC2 page
1. Click Create Autoscalign Group
1. Go to the next section
1. Select the System Image that you would like you server to start from
1. Go to the next section
1. Name the Launch Configuration. I always append ` - V1` so I know which version I'm at
1. Make sure you select the `IAM role` to the one that we created in the previous section
1. If you want to add some `User data` you can expand the `Advanced Details` section so every time the server start it will process this Bash file. 
1. Go to the next section
1. Add how much storgae you'd need
1. Go to the next section
1. Select a `Security Group`
1. Go to the next section
1. Check if evrythign is OK
1. Click `Create launch configuration`
1. Select the SSH Key

After this point you'll imediatly see the `Auto Scaling Group` page since we are in the Wizzard mode

### Auto Scaling Group

This is where you define how many EC2 Instances you would like to have with the exact same configuration. Based on for example a minimum number of servers, CPU load, Traffic in/out or based on waht the waht is seat to a specifci Load Balancer. This means that you can for example say, that you want a minimum o 2 EC2 Servers. This means that AWS will created 2 servers and apply the Launh Configurations that you have selected, and will alwasy keep a minimum of 2 EC2 Instances.

**The setup to create a Auto Scaling Group**

1. Give it a name
1. Set the group size to a minimum of 1 for now
1. Select a VPC
1. Select the subnet nettworks that you used in the `Load Balancer` section
1. Go to the next section
1. Keep the default selection
1. Go to the next section
1. If you want (I recomend doign it eventually) you can have the Autoscalign Grup send you and email everytime a servers gose down and a new one is created in its place.
1. Go to the next section
1. Set tags
1. Go to the next section
1. Click `Create autoscalign group`
    
### CodeDeploy

So many words to just reach this "simple" point in space. The place where all just works, you know, like magic, and can be done in minutes. Yea right ;).

The CodeDeploy section will have a list of all the "Apps", but lets put big air quotes here, this has nothign to do with an app, becasue that word implys some sorth of automation. An app is just a colelction of configurations that will be executed when an event happens. Meaninig when an event happens, the CodeDeploy from the dashboard will reach out to the CodeDeploy installed in the EC2 instacne, whichi in that case will pull the new code and follow the instructions from the `appspec.yml` configuration file.

The thing that you can specify in the Dashboard is how the code will be deployed, for example:

- Deploy the new code on each EC2 one by one, and stop if somethign goes wrong. 
- Replace the code at the same time on all servers.

A little bit of automation ;)

**The setup to create a CodeDeploy app**

1. Go to the CodeDeploy section
1. If this is the first time you run CodeDeploy, select `Custom deployment`
1. Set a name
1. Set a description
1. Select Blue/green deployment
1. In the `Environment configuration` section select `Automatically copy Auto Scaling group` and then seelct the group that we just created
1. In the `Load balancer` section select the LB that we created
1. In the `Service Role` select the role that we created before

### GitHub

We are almost at the finish line. Now we need to go to our GitHub project settigns, to add support for CodeDeploy, by basically telling GitHub to send a webhook to our seelcted CodeDeploy to let it know that there was a new commit. To achive this we need to add two things:

- Add AWS CodeDeploy
- Add GitHub Auto-Deployment 

**The setup to create Auto-Deployment**

1. Got to GitHub
1. Go to a project that you like to deploy
1. Go in to Settings
1. Go in to Integrations & services
1. From the `Add Service` drop down menu seelct `AWS CodeDeploy`
    1. Set the Application name that you just crated
    1. Set the Deployment group that you just crated
    1. Set the Aws access key
    1. Set the Aws region, probably `us-east-1`
    1. Don’t set GitHub api url
    1. Set the Aws secret access key
    1. Don’t set the GitHub token
    1. Check Active
1. From the `Add Service` drop down menu seelct `GitHub Auto-Deployment`
    1. Set the GitHub token
    1. Set the Environments
    1. Don’t check Deploy on status
    1. Don’t set GitHub api url
    1. Check Active
