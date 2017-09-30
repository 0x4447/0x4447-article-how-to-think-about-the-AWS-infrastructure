# CodeDeploy

If you go the homepage of this article you'll see that all the names of the folders are prepended with a number. This was done on purpouse to help teach step by step each key aspect of AWS in a order that builds on to of the previouys sections. I belive this order is key to more simply kickstart your midn to structure and organize the key components of AWS. 

A very important thing to understand is that you can't use CodeDepoy before you udnerstand all the othere Lego blocks. I mean you could follow a tutorial that takes you step by step, but you wouldn't be able to chagne he configurations, or deploy another peace of software thath needs some changes. By reachign this poing after going over each other section will allow you to honeslty do whathever you want with AWS at this point, and CodeDeploy is the last missing peace to unlock the whole potential of AWS, any other tool that you'll use afte this point are goign to be nice addition that are not critial to use or understand the Amazon offering. 

And so you see how the Marketign materials and all the PR done around AWS and CodeDeploy is far from the truth. We head to leanr 10 other things befroe we could reach this point. But maybe I'm stipud and never found the magic button, or are a bad DevOps becasue I unable to setup evrythign that is needed for CodeDeploy in 5 minuets? Maybe, so if you think that you foudn the magic button, or knwo a trick to deploy all this in minutes as advertised, please let me know. 

# What is CodeDeploy?

CodeDeploy is truly just an [app](http://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html) that you have to install on each deployed server (if you don't use the official AWS images). This app is used by CodeDeploy in the AWS dashboard to communicate with the server and perform actions based on the configuration file that is suplied with the project.

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

# The two folders in this section

**Availability Zones**

The "easiest" way to deploy a new commit to multiple server is by just staying in one Region, and deploy to multiple servers scattered across multiple Availability Zones.

Usign this aproach you can setup GitHub to actually trigger a CodeDeploy deployment fairly easy sicne each repo can have a CodeDeploy trigger. 

**Multi Region Deployment**

The triggers that you configured in the single Region setup don't have the option to trigger multiple CodeDeployments setup. Meaning there is no way for GitHub to notify more then one CodeDeploy application. This means that we need to come up with a custom solution to achive this. And the simpleast aproach that I can think of is this:

1. Create a Lambda function which will receive the GitHub webhook notifciation when there is a new commit.
1. The Lambda function will then dowload the compressed repo and save it in a S3 Bucket which have versioning enbald (this allows us to use the same file name so it is easier to lisen to a new event and get the file)
1. Then another Lambda function will listen to S3 events, and when one happens it will tell CodeDeploy to start a new deplaomnet with usign the code from the latest version of the file. 

In the last Lambda function you will have an array containing all the CodeDeployment setup that you have across the world, and trigger a new deployment for each reagion.

Simple right? Just works right? In just few minutes? Yea right 🤣. It is time to start creatign our setup and see how it goeas.
