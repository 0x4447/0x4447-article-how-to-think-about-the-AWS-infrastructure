# It is time to trully do it

By now I trulls hope I gave you a good picture of AWS, and if you give yoursefle some time to process all of the previous information, from now on, nothing should look complicated anymore.

But since you are goign to do this the first time, there is a good chance that the setup won't work the first time. If this happens, scrap averythign and start over. THere are meny steps in this process, and if you miss one, nothing will wokr. Give yourself time, and be patient. There is a lot to go thorough.

- https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/08_Auto_Scaling

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

We are almost at the finish line. Now we need to go to our GitHub project settigns, to add support for CodeDeploy, by basically telling GitHub to send a webhook to our seelcted CodeDeploy to let it know that there was a new commit. To achive this we need to add two integrations and create one `personal access token`:

**The setup to create a personal access token**

1. Go to the Settign page in your gitHub account
1. From the left side menu select [personal access token](https://github.com/settings/tokens)
1. Click `Generate new token`
1. Name the token, for example I choose `AWSCodeDeploy`
1. In the `Scope` section select:
  1. repo:status
  1. repo_deployment
1. Click `Generate token`
1. On the next page, copy and store the token in secure place, this token won't be visible once you live this page.

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
    1. Set the GitHub token created from above
    1. Set the Environments
    1. Don’t check Deploy on status
    1. Don’t set GitHub api url
    1. Check Active
