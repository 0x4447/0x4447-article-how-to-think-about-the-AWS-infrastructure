
OK, by now I trulls hope you’ve got all the information and understanding on how this whole AWS works, the main idea, the foundation on which it stands… Legos. Time to sit down on the floor and build our pirate ship! Reality check - this is far from simple, far from straight forward. It has an insane amount of steps, and if you'll miss just one, everything will fall apart.

Before we start working with CodeDeploy we need two things to do in our account that thankfully once done, they don’t need to be changed, edited or redone. We need to create 2 new Roles and 1 custom policy

The Service

This is a Role that will be used for CodeDeploy, so when you create a new App in the CodeDeploy UI, you can give this auto deployment the rights to perform actions on your behalf.

1. Go to AWS IAM Roles
    1. Click Create new role
    2. From the AWS Service Role select AWS CodeDeploy
    3. Check AWSCodeDeployRole
    4. Click Next Step
    5. Name the service however you want, but make sure the name contains the word Service, better identification
    6. Click Create role

The Instance

This is a Role that will be used for all your EC2 instance to give CodeDeploy installed the chance to perform all the necessary actions on your behalf

1. Go to AWS IAM Roles
    1. Click Create new role
    2. From the AWS Service Role select Amazon EC2
        1. Check AmazonEC2RoleforAWSCodeDeploy
        2. Check AutoScalingNotificationAccessRole
        3. Check AdministratorAccess
    3. Click Next Step
    4. Name the service however you want, but make sure the name contains the word Instance, better identification
    5. Click Create role

The GitHub User Policy

The user that is going to be used on the GitHub side

- Go to AWS IAM
    - Go to Policies
    - Click Create Policy
    - Select Create Your Own Policy
    - Set the Policy Name
    - Set the Description
    - Paste the JSON from bello in to Policy Document

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

The Setup

-VPC


- Go to AWS EC2 Load Balancer section
    - Click Create Load Balancer
    - Select Classic Load Balancer
    - Click Continue
    - Set the Load Balancer name
    - Select the right VPC if you have more then one
    - Don’t check Create an internal load balancer
    - Don’t check Enable advanced VPC configuration
    - In the Load Balancer Protocol section select the options that best fits your app
    - Click Next: Assign Security Groups
    - Select a Security Group
    - Click Next: Configure Security Settings
    - Click Next: Configure Health Check
    - Select TCP in the drop down menu for Ping Protocol
    - Click Next: Add EC2 Instances
    - Click Next: Add Tags
    - Click Review and Create
    - Click Create
- Create a new Launch Configuration if you don’t have one. Launch Configurations can be reused
- Go to AWS IAM
    - Go to Users
    - Click Add User
    - Set the User name
    - Check Programmatic access
    - Click Attach existing policies directly
    - Search for the Policy that you created in the step above
    - Click Next:Review
    - Click Create user
    - Save the Key and Secret in a secure place
- Create a GitHub Access Token
    - Go to GitHub
    - Click on your avatar
    - Select Settings
    - Go to Personal access tokens
    - Click on to Generate new token
    - Set the Token description
    - Check repo:status
    - Check repo_deployment
    - Click Generate token
    - Save the Generated Token in a safe place

All the steps to put it together

1. Go to the Auto Scaling Group section and make a new one
    1. Select the Launch Configuration
    2. Select the Load Balancer
    3. Change the cool down time to 120 sec
2. Go to the CodeDeploy section
    1. Create a new app
    2. Set a name
    3. Set a group
    4. Select Blue/green deployment
    5. Select the Auto Scaling Group that you created
    6. Select the Load Balancer
    7. Set the Service Role
3. Got to GitHub
    1. Go to a project
    2. Go in to Settings
    3. Go in to Integrations & services
    4. Add AWS CodeDeploy
        1. Set the Application name
        2. Set the Deployment group
        3. Set the Aws access key
        4. Set the Aws region
        5. Don’t set GitHub api url
        6. Set the Aws secret access key
        7. Don’t set the GitHub token
        8. Check Active
    5. Add GitHub Auto-Deployment
        1. Set the GitHub token
        2. Set the Environments
        3. Don’t check Deploy on status
        4. Don’t set GitHub api url
        5. Check Active
