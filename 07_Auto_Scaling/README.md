# Understandign Auto Scaling the right way

AWS Auto Scaling is one of thoes things that actualy is fairly straight forward to understand and work with, but AWS fails to explain the relation betwen the `Launh Configuration` and the `Auto Scalign Group`. Let see if we can do better.

# The General Idea

The idea of Auto Scaling is to have multiple servers with the same exact code and configuration for two main reasons:

- redundancy: one server goes down, the other can still process incommign requests
- spread the load: instead of upgardgin one server to a bigger one you spread the load among multiple servers

To take advantage of this feature you'll alos need a Load Balancer, but more on this in the next sectin.

# Auto Scalign Group dose all the work

In the `Auto Scalign Group` configuration is where you specify how AWS should handle your setup. You cna speficy the minimum ammount of server and the maximum allwoed, you cna specify how the healt of a server should be monitored, how many AZ do you want to use etc.

The `Auto Scalign Group` is the one responsabile to spin a new EC2 server if a server is not reachable, or the app that should be run on the server is not respondign anymore becasue maybe it crashed. If that happens, the `Auto Scalign Group` will spinn more EC2 instances to preserve the minimum ammount of server that we specifyed in the configuration. 

But to work the `Auto Scalign Group` needs to know how to configure the EC2 servers, and this is where the `Launh Configuration` comes to play.

# Launh Configuration brake down

An `Auto Scaling Group` can't exists wihout a `Launh Configuration`, thus the later needs to come first. In this section is where you create a configuration that will be used by `Auto Scaling Group` to create new EC2 instances. The prcoess of creating a `Launh Configuration` is very similar to when you Launch a new EC2 Instance. With the difference that you have to name the `Launh Configuration` etc. You get to specify the following:

1. Choose AMI
1. Choose Instance Type
1. Configure details
1. Add Storage
1. Configure Security Group
1. Review

As you can see this is the identialc setup for a EC2 Instacne, and as you can see from the 3th option, we have access to the `Configure details` where you can specify the `User data`! Meaninig you can reliebliy make EC2 cloens indentical to each other.

# Edit Launh Configuration and update all the EC2

Let say you need to make a chagne in the `Launh Configuration` and updated all the EC2 that were created with the original configuration by the `Auto Scaling Group`. Turns out that this is straigth forward and cool onces someone tells you how to go about it (Wait... am I gettign excited 🤔). 

### Make a Launh Configuration copy

When you visit the `Launh Configuration` menu, you have the chance to make a copy of a specific configuration (you can't edit them dirrectly). When you start makign a copy, you'll have the chnce to name the new configuration, I always append `- V1` to keep track how many edits did I do, and which one is the latest version. 

Then in the 3th tab you can as always edit your `User data` to the new script that you did. Once you are done, you just save the new `Launh Configuration`, and this is step one.

### Update the Auto Scaling Group

The `Auto Scaling Group` have very limited edits options. But one important thing you can edit, is the active `Launh Configuration` to be used when creatgin new EC2 Instances. This means that you select the Group you want to change, select edit, and chagne the `Launh Configuration` to the latest version you made, and save.

Now, notign will happen, all the active and workign EC2 Instance will keep on workign, to apply the new configuration, you'll have to termiante the EC2 Instances. When you do that, the `Auto Scaling Group` will detect that the Group doesnet have the minimum ammount of healty servers, and will start to spin new ones. As you can imagin, it will start new EC2 servers based on the new configuration that you made.

This givews you the option to terminate every EC2 at once, or update the group by termianting one server at the time. It is up to you how you want to go aobut it. 

# Amazing End

As you can see this part is actually fairly cool, and works well once you udnerstand how to trully go about it :).

# Befroe we go to CodeDeploy

There is a big chance that you just had the following idea: why not just use the `User data` section to automatically deploy a project. And this is a valid way of going about it. You could wrtie a Bash file that would:

- updated the package manager
- install all you need
- grab the code of the proejct from GitHub, S3, FTP you name it
- configure the projet
- start it 

If you were to choose this proach, then you need to be aware that your developers won't have dirrect access to what should happen when the code is beeing deployed. Becasue the whole configuration where you specify what to do before and after will be in this one Bash file. 

CodeDeploy adds the ability to create a special configuration files where you can specify what Bash script should be cexuted an at which stage befreo startign a proejct. This way the developer have fll controll how a porject should be deployed. Which makes the whole process more flexible. 

This are the differecne worth knowing.

# Step by step configuration

### Launch Configurations

**IMPORTANT**: The first time you go through this setup, AWS will give you a wizzard that will help you create a Autoscalign Group with the Launch Configurations since for some reason one can't live without the other - it is romantic, but as the Load Balancer show, two things that works toghether can also be crated on their own and just be.

**The setup to create a Launch Configurations - Wizzard**

1. Go to the `Launch Configuration` section in the AWS EC2 page
1. Click Create Autoscalign Group
1. Go to the next section
1. Select the System Image that you would like you server to start from
1. Go to the next section
1. Name the Launch Configuration. I always append ` - V1` so I know which version I'm at
1. Make sure you select the `IAM role` to the one that we created in the previous section
1. If you want to add some `User data` you can expand the `Advanced Details`. Find the code to past [here](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/blob/master/08_Auto_Scaling/user_data.sh), and don't forget to check the [07_User_Data](https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/07_User_Data) section to find out more about `User data` if you didn't read it already.
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

