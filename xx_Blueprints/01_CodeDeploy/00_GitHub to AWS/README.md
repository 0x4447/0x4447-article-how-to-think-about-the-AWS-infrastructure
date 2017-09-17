# It is time to trully do it

By now I trulls hope I gave you a good picture of AWS, and if you give yoursefle some time to process all of the previous information, from now on, nothing should look complicated anymore. 

But since you are goign to do this the first time, there is a good chance that the setup won't work the first time. If this happens, scrap averythign and start over. THere are meny steps in this process, and if you miss one, nothing will wokr. Give yourself time, and be patient. There is a lot to go thorough.

# Do it once, and never again 

Before we start working with CodeDeploy we need to do two things in our AWS account. We need to create 2 new Roles and 1 custom policy

### The Service Role

This is a Role that will be used by CodeDeploy, this wya when you create a new "App" in the CodeDeploy UI, you can give this setup the rights to perform actions on your behalf. In this case you'll give it access to the EC2 Instances.

Steps to make the Service Role

1. Go to AWS IAM Roles
1. Click Create new role
1. From the AWS Service Role select AWS CodeDeploy
1. Check AWSCodeDeployRole
1. Click Next Step
1. Name the service however you want, but make sure the name contains the word Service, better identification
1. Click Create role

### The Instance Role

This is a Role that will be used by all the EC2 Instance attached to CodeDeploy

Steps to make the Instance Role

1. Go to AWS IAM Roles
1. Click Create new role
1. From the AWS Service Role select Amazon EC2
   1. Check AmazonEC2RoleforAWSCodeDeploy
   1. Check AutoScalingNotificationAccessRole
   1. Check AdministratorAccess
1. Click Next Step
1. Name the service however you want, but make sure the name contains the word Instance, better identification
1. Click Create role

### The GitHub User Policy

The user that is going to be used on the GitHub side

1. Go to AWS IAM
1. Go to Policies
1. Click Create Policy
1. Select Create Your Own Policy
1. Set the Policy Name
1. Set the Description
1. Paste the JSON from bello in to Policy Document

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

# Start

The result of the previous steps can be reused in your AutoDeployment, where the followign one needs to be repeated for each project you want to deploy. Meaninig let say you have a micro-servcie infrastructure, you'll have to repeate the followign steps for each micro service. Or to put it even in a differetn way, you'll have to repeat this step for each repository you have on GitHub.

### Load Balancer

The idea of the cloud is resiliance, and the ability to spin multiple servers with the same code, so the load can be split across multiple machines. In this setup we are going to have aminimum of two servers (always) thus we need a load balancer which will split the traffci betwen the servers that are gogin to be atacched to it.

The setup to create a Load Balancer

1. Go to AWS EC2 Load Balancer section
1. Click Create Load Balancer
1. Select Classic Load Balancer
1. Click Continue
1. Set the Load Balancer name
1. Select the right VPC if you have more then one
1. Don’t check Create an internal load balancer
1. Don’t check Enable advanced VPC configuration
1. In the Load Balancer Protocol section select the options that best fits your app
1. Click Next: Assign Security Groups
1. Select a Security Group
1. Click Next: Configure Security Settings
1. Click Next: Configure Health Check
1. Select TCP in the drop down menu for Ping Protocol
1. Click Next: Add EC2 Instances
1. Click Next: Add Tags
1. Click Review and Create
1. Click Create

### Launch Configurations

As you learned before from the Env Variable section. A Launch Configuration allows you to create identical EC2 instances, based on what is specified in such configuration. A LC must be created if you are going to use the Auto Scaling featire. 

A thing worth nothing, is that a Launch Configuration can be reused and applayed to different Auto Scalign Groups. This should help you name a LC in a way that will make more sense to you. Since as with AWS, most of the time you can't reneame somethign once you created it.

The setup to create a Launch Configurations

1. Go to...

### Auto Scaling Group

This is where you define how many EC2 Instances you would like to have with the exact same configuration. Based on for example a minimum number of servers, CPU load, Traffic in/out or based on waht the waht is seat to a specifci Load Balancer. This means that you can for example say, that you want a minimum o 2 EC2 Servers. This means that AWS will created 2 servers and apply the Launh Configurations that you have selected, and will alwasy keep a minimum of 2 EC2 Instances.

The setup to create a Auto Scaling Group

1. Go to the Auto Scaling Group section and make a new one
1. Select the Launch Configuration
1. Select the Load Balancer
1. Change the cool down time to 120 sec
    
### CodeDeploy

So many words to just reach this "simple" point in space. The place where all just works, you know, like magic, and can be done in minutes. Yea right ;).

The CodeDeploy section will have a list of all the "Apps", but lets put big air quotes here, this has nothign to do with an app, becasue that word implys some sorth of automation. An app is just a colelction of configurations that will be executed when an event happens. Meaninig when an event happens, the CodeDeploy from the dashboard will reach out to the CodeDeploy installed in the EC2 instacne, whichi in that case will pull the new code and follow the instructions from the `appspec.yml` configuration file.

The thing that you can specify in the Dashboard is how the code will be deployed, for example:

- Deploy the new code on each EC2 one by one, and stop if somethign goes wrong. 
- Replace the code at the same time on all servers.

A little bit of automation ;)

The setup to create a CodeDeploy app

1. Go to the CodeDeploy section
1. Create a new app
1. Set a name
1. Set a group
1. Select Blue/green deployment
1. Select the Auto Scaling Group that you created
1. Select the Load Balancer
1. Set the Service Role

### GitHub

We are almost at the finish line. Now we need to go to our GitHub project settigns, to add support for CodeDeploy, by basically telling GitHub to send a webhook to our seelcted CodeDeploy to let it know that there was a new commit. To achive this we need to add two things:

- Add AWS CodeDeploy
- Add GitHub Auto-Deployment 

The setup to create Auto-Deployment 

1. Got to GitHub
1. Go to a project
1. Go in to Settings
1. Go in to Integrations & services
1. Add AWS CodeDeploy
    1. Set the Application name
    1. Set the Deployment group
    1. Set the Aws access key
    1. Set the Aws region
    1. Don’t set GitHub api url
    1. Set the Aws secret access key
    1. Don’t set the GitHub token
    1. Check Active
1. Add GitHub Auto-Deployment
    1. Set the GitHub token
    1. Set the Environments
    1. Don’t check Deploy on status
    1. Don’t set GitHub api url
    1. Check Active
