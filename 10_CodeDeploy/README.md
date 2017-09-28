# CodeDeploy

All the folders in the repo before this one, were put there to prepare you to the biggest lie of them all… CodeDeploy. Very article on the internet will start by telling how easy it is an how everything will just be automatic and works.

This is complete nonsense. That is why first we need to understand what really is CodeDeploy, and how can you interact with it, to make it work the way it was advertised. Because the fans idea spread on-line is that you push a commit to GitHub and magically it will be deployed to all your servers - AHAHAHAHAH - thats all I can say. Good luck finding the magic button or setting.

The reality is that CodeDeploy is just a an app that AWS did. Meaning this is just an app that you needs to install on each server you want to deploy your code to.

In addition to that you won’t be able to deploy in a easy way across all the world, because as we learned, AWS is strictly Region specific, and all regions are independent.

Am I’m telling that you can’t have servers all over the globe and push a commit to all of them, no. I’m telling that to achieve that you’ll spend months preparing the infrastructure of this scenario.

I hope that I can help you cut down on the time need to achieve it, but lets not lie to ourselves, you’ll still need time and dedication to do it.

# Legos with Legos

If AWS are Legos scattered on the ground, then CodeDepoy are even more fine peaces sprinkled around, because you can go about making an auto deployment in dozens of way. Seriously your imagination and level of masohism is your limit.

# In more detail later, but in the mean time

**Availability Zones**

The "easiest" way to deploy a new commit to multiple server is by just staying in one Region, and deploy to multiple servers scattered across multiple Availability Zones.

This way you can setup a GitHub project to fire a webhook to a seelcted CodeDeploy, which will initiate the deployment if configured the right way.

**Multi Region Deployment**

Since you can't setup GitHub to fire a webhook to multipe CodeDeploys in diffeent regions, we need to chagne the aproach, and the simplest solution is this:

1. You create a Lambda function waht will receive the GitHub webhook notifciation when there is a new commit.
1. The Lambda function will dowload the compressed repo and save it in a S3 Bucket
1. Any code Deploy that you might have setup will listen to events created by that S3 bucket
1. A new file will trigger CodeDeploy to get the file and deploy it.

This solution will allow you to trully deploy acros Regions since S3 is not Region specifci. Simple right? Just works right? Wait untill you'll see the real setup 🤣.

# And done!

We arrive at the end, where you should have the bare minimum knoledge require to start having an undestandign how to put the Lego blocks together. I know there is a lot to take in, but my hope is that I'll shorten the time required to get a graps of the core elemtns of AWS.

# Time for the details

OK, we did spend some time understandign the high level concept of AWS and CodeDeploy, we know by now that the Amazon promises are lies, and we have to put in the work if we don't want to use any 3th party sulution. Lets tart with what CodeDeploy givews you and how it can help you to deploy your code.

# It is just an app

CodeDeploy is truly jsut an [app](http://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html) that you have to install on each deployed server. Then this app is used by CodeDeploy in the AWS dashboard to communicate and perform actions based on the configuration file that is suplied with the project.

# The appspec.yml file

To use CodeDeploy you need to add the appspec.yml file to your project, without it CD won't work at all, becasue this fail contains all the instructions for CodeDeploy to work. You can specify where the code should be moved. You can specify to run Bash scripts that you prepared, before instlation, after instalation etc. Basically this is the place where you construct what will happen once CodeDeploy starts workign inside an EC2 instance. Check out the example file bellow to get an idea of what can be specified.

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

This are of course my own examples, that you don’t have to follow. If I’d recommend checking out the documentation to find out all the options that are at your disposal [here](http://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file.html).

# Hot to debug CodeDeploy

The last helpful peace of information that I can give you is how to debug a setup for auto deployment.

### Check CodeDeploy version

`sudo dpkg -s codedeploy-agent`

### Code deploy installation logs

`tail -f /tmp/codedeploy-agent.update.log`

### Code Deploy work logs

`tail -f /var/log/aws/codedeploy-agent/codedeploy-agent.log`

### Where is CodeDeploy in my system?

You’ll find it in `/opt/codedeploy`. Worth getting around the folder to get a sense of what you can find there.

### Manage CodeDeploy

Since CodeDeploy is run as a service, it is easy to manage it:

`sudo service codedeploy-agent status`

You can stop it, restart it etc using `service`

### Test if you have the right Roles

As mentioned in the folder before. Each EC2 Instance needs to have the right permissions to perform the right task. This is done with IAM Roles, and to check if they are set correctly you can call this URL http://169.254.169.254 to see what you have.

The following command will show you the name of the Role that is applyed to the EC2 Instance

```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

This one will show you details about the Role.

```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/NAME_OF_THE_ROLE_THAT_YOU_GOT_FROM_THE_COMMAND_BEFORE
```



