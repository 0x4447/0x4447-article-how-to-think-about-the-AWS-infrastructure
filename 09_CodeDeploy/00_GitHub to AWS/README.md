# Single Region Deployment

This article was designed to be modular, so before you do anything with CodeDeploy, you need to go over the following step. Each section gives a detailed explanation of how to create each piece of the puzzle. This section contains only the steps that can't be shared through other parts of the article. 

1.  Create some credentials: [02_IAM](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/02_IAM).
2.  Configure autoscaling: [08_Auto_Scaling](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/08_Auto_Scaling).
3.  Create a load balancer to attach to the Autoscaling Group [09_Load_Balancing](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/09_Load_Balancing).

# CodeDeploy

When you create a CodeDeploy setup, you can specify how the code will be deployed in the Dashboard. For example:

1. Deploy the new codes one by one on each EC2, and stop if something goes wrong.
2. Replace codes at the same time on all servers.
3. Etc.

**Steps to Create a CodeDeploy App**

1. Go to the CodeDeploy section.
2. If this is your first time running CodeDeploy, select "Custom deployment".
3. Set a name.
4. Set a description.
5. Select blue/green deployment.
6. In the "Environment configuration" section, select "Automatically copy Auto Scaling group", and then seelct the group we just created.
7. In the "Load balancer" section, select the LB we created.
8. In the "Service role" section, select the role we created.

### GitHub

We're almost at the finish line! Now we need to go to our GitHub project settings to add support for CodeDeploy. Basically, we'll tell GitHub to send a webhook to our selected CodeDeploy and let it know that there was a new commit. To achieve this, we need to add two integrations and create one "personal access token":

**Steps to Create a Personal Access Token**

1. Go to the Settings page in your gitHub account.
2. From the left side menu, select [personal access token](https://github.com/settings/tokens).
3. Click "Generate new token".
4. Name the token. For example, I chose "AWSCodeDeploy".
5. In the "Scope" section, select:
  a. repo:status
  b. repo_deployment
6. Click "Generate token".
7. On the next page, copy and store the token in a secure place, because it won't be visible once you leave this page.

**Steps to Create Auto-Deployment**

1. Go to GitHub.
2. Go to the project you'd like to deploy.
3. Go into Settings.
4. Go into Integrations and Services.
5. From the "Add Service" dropdown menu, select "AWS CodeDeploy".
    a. Set the Application name you just created.
    b. Set the Deployment group you just created.
    c. Set the AWS access key.
    d. Set the AWS region, probably "us-east-1".
    e. Don’t set GitHub API URL.
    f. Set the AWS secret access key.
    g. Don’t set the GitHub token.
    h. Check Active.
6. From the "Add Service" dropdown menu, select "GitHub Auto-Deployment".
    a. Set the GitHub token created above.
    b. Set the Environments.
    c. Don’t check Deploy on status.
    d. Don’t set GitHub API URL.
    e. Check Active.
    
# You Will Fail the First Time

If you're new to this, it's pretty much guaranteed that your first few tries aren't going to work. But don't give up. This is perfectly normal, with the sheer amount of necessary knowledge and all of the pieces you have to put toghether. Relax, take your time, and repeat this tutorial until you can reproduce it with your eyes closed.
