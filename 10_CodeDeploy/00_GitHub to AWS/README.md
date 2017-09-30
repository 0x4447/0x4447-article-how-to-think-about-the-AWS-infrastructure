# Singe Region Deployment

Since this article was designet to be moduler, before you do anythign with CodeDeploy you need to go over the following step. Each section have a details explanation how to create each peace of the puzzle. This section contains only the steps that can't be shared with other part of the article. 

- First we need to create some credentials: [02_IAM](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/02_IAM)
- Then we need to know how to use the User data functionality to have a consistent EC2 deployment: [07_User_Data](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/07_User_Data)
- Then we have to configure autoscaling: [08_Auto_Scaling](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/08_Auto_Scaling)
- And lastly we have to create a Load balancer to attach to the Autoscaling Group [09_Load_Balancing](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/09_Load_Balancing)

### CodeDeploy

When you create a CodeDeploy setup, the thing that you can specify in the Dashboard is how the code will be deployed, for example:

- Deploy the new code on each EC2 one by one, and stop if somethign goes wrong.
- Replace the code at the same time on all servers.
- Etc.

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
    
# You will fail the first time

If you are doing this the frist time for sure your first few tries won't wokr. But don't give up. This is perfectly normal with the share ammount of knoledege an peaces that you have to put toghether. Relax, take your time, and repeat this tutorial untill you can reproduce it with youe eyes closed.
