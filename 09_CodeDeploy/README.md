# CodeDeploy

If you go this article's homepage, you'll see that all of the folder names are prepended with numbers. I did this on purpose to teach the key aspects of AWS, step-by-step and in order, so each section builds on the previous one. I believe that presenting the steps in order is key to helping to kickstart your mind to structure and organize the key components of AWS. 

It's very important that you understand that you can't use CodeDeploy before you understand all the other Lego blocks. You could follow a step-by-step tutorial, but you wouldn't be able to change the configurations or deploy another piece of software that needs some changes. If you reach this point after you've gone over every other section, you can do virtually whatever you want with AWS. CodeDeploy is the last missing piece to unlock everything AWS has to offer, and any other tool that you might use after this will just be a nice addition. 

You can see that the information in the AWS marketing materials and PR is actually far from the truth. We need to learn ten extra things before we reach this point. Maybe I'm stupid and never found the magic button, or maybe I'm a bad DevOps, because I was unable to set up evrything needed for CodeDeploy within five minutes. So if you think that you've found the magic button, or if you know a trick for deploying everything in minutes, as advertised, please let me know. 

# What is CodeDeploy?

CodeDeploy is really just an [app](http://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html) that you install on each deployed server (if you don't use the official AWS images). CodeDeploy uses the app in the AWS dashboard to communicate with the server and perform actions based on the configuration file that's supplied with the project.

# The appspec.yml File

To use CodeDeploy, add the appspec.yml file to your project. Without that file, CD won't work at all, because the file contains all instructions needed to make CodeDeploy work. You can specify where the code should be moved. You can specify to run your Bash scripts, before installation, after installation, and so on. Basically, this is the place where you'll construct what will happen once CodeDeploy starts working inside an EC2 instance. Check out the example file below to get an idea of what can be specified:

```
version: 1.0
os: linux
files:
  - source: ./
    destination: /var/www/
  - source: ./configs/site.service
    destination: /etc/systemd/system
permissions:
    - object: /var/www/
      owner: admin
      group: admin
hooks:
  BeforeInstall:
    - location: scripts/before.sh
      timeout: 300
      runas: root
  ApplicationStart:
    - location: scripts/start.sh
      timeout: 300
      runas: root
```

Of course, this is my own example, and you don’t have to follow it. I’d recommend that you check out the documentation to discover all the options that are at your disposal [here](http://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file.html).

# How to Debug CodeDeploy

The one last helpful piece of information I have concerns debugging a setup for auto deployment.

### Check CodeDeploy Version

"sudo dpkg -s codedeploy-agent"

### CodeDeploy Installation Logs

"tail -f /tmp/codedeploy-agent.update.log"

### CodeDeploy Work Logs

"tail -f /var/log/aws/codedeploy-agent/codedeploy-agent.log"

### Where is CodeDeploy in My System?

You’ll find it in "/opt/codedeploy". It's worth the effort of getting around within the folder to get a sense of what you can find there.

### Manage CodeDeploy

Since CodeDeploy is run as a service, it's easy to manage it:

"sudo service codedeploy-agent status"

You can stop it, restart it, and so on, using "service"

### Test to See If You Have the Right Roles

As mentioned in the previous folder, each EC2 Instance requires the right permissions to perform a task. Do this with IAM Roles, and to check whether they're set correctly, call this URL http://169.254.169.254 to see what you have.

The following command will show you the name of the Role that's applied to the EC2 Instance:

```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

This one will show you details about the Role:

```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/NAME_OF_THE_ROLE_THAT_YOU_GOT_FROM_THE_COMMAND_BEFORE
```

# The Two Folders in This Section

**Availability Zones**

The "easiest" way to deploy a new commit to multiple servers is simply to stay in one region and deploy to multiple servers scattered across multiple Availability Zones.

Using this aproach allows you to set up GitHub to fairly easily trigger a CodeDeploy deployment, since each repo can have a CodeDeploy trigger. 

**Multi-Region Deployment**

The triggers configured in the single-region setup don't have the option to trigger set-up for multiple CodeDeployments. This means that there's no way for GitHub to notify more than one CodeDeploy application, so we need to come up with a custom solution to achieve that. This is the simplest approach I can think of:

1. Create a Lambda function that will receive the GitHub webhook notification when there's a new commit.
2. The Lambda function will then download the compressed repo and save it in an S3 Bucket that has versioning enabled (allowing us to use the same file name so it's easier to listen to a new event and get the file).
3. Then another Lambda function will listen to S3 events, and when one happens, it will tell CodeDeploy to start a new deployment using the code from the latest version of the file. 

In the last Lambda function, you'll have an array that contains all the CodeDeployment setup you have across the world, and trigger a new deployment for each region.

Simple, right? Just works, right? In just few minutes? Yea right. It's time to start creating our setup and see how it goeas.
