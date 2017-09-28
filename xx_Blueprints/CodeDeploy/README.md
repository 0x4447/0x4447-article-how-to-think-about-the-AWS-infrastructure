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

As mentioned in the folder before. Each EC2 Instance needs to have the right permissions to perform the right task. This is done with IAM Roles, and to check if they are set correctly you can call this URLs to see what you have.

The following command will show you the name of the Role that is applyed to the EC2 Instance

```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

This one will show you details about the Role.

```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/NAME_OF_THE_ROLE_THAT_YOU_GOT_FROM_THE_COMMAND_BEFORE
```
