# What is Amazon AppStream 2.0

This solution is based on the Windows operating system, where you get the possibility to have your own Windows server where you can install apps that that you care about and then allow your users access only those apps from a browser, where the browser acts as a VNC client that gives the user only the view of that one specific app that you installed.

<div align="center">
	<img src="https://raw.githubusercontent.com/0x4447/0x4447-article-how-to-think-about-the-AWS-infrastructure/master/x15_App_Stream_2.0/assets/user_view.png">
</div>

# Benefits

1. You don't have to give the user access to the whole Windows machine. Meaning the user can only use the exposed app(s) that you select. Which minimize the amount of work you have to do on the Windows server since the user can't interact with any other part of the system. Thus he or she can't do any damage to the system.
1. You can update the exposed app(s) in one place and any every user will get access to the updated version. Instead of updating each local installation.
1. Quicker on boarding of a new employee, since you have to just create a new account on AppStream 2.0, and they can immediately start working with those app(s)
1. Infinite power, meaning if you need to use apps that perform a lot of intensive CPU or GPU intensive calculations then by using AppStream 2.0 you can take advantage of the more beefy AWS servers.

# Drawbacks

1. The major drawback is the constant need of a Internet connection and a connection that have some decent speed with low latency. And there is no dancing around this. If you know that you have a good connection and few days a year your are ok with having your user not being able to access their app(s) then this tool might be a good solution for you.
1. The app will never be as responsive as a local installation.

# The right order to make it all work

As always AWS won't tell you the right order to accomplish the initial setup. Not to mention that the UI of the Dashboard is completely out of order. The right order is as follows:

1. Images
1. Fleets
1. Stacks
1. User Pool

Lets brake down each section

### Images

Since your app run on a Windows server you need to create a base image that will hold the operating system and your apps. Your Image will be based on a list of predefined Windows images, each fine tuned for specific task. You can use a general purpose one or a one made specially for GPU performance for example.

Since this is the base our your AppStream 2.0 offering, this is the image you install new app one. Since this image will be used to spin your instance.

### Fleets

You can thins of this section the same way you think about an EC2 instance. This are your server, you take the image that you created, and use them to spin up servers.

### Stacks

The Stack is the glue that interface the User with the Fleet. When you create a Fleet you have to tell which stack this Fleet should be using.

### User Pool

This section is bit unintuitive, because you'd think that you need to create User Accounts in the IAM section of AWS, but not in the AppStream 2.0 case. The users that you create here have nothing to do with the rest of the AWS infrastructure. And when you create one, you can then assign a Stack to that particular person.

The nice thing that AppStream 2.0 provides is the ability to send to the user an email that will let him or her know about a new AppStream 2.0 being created.

# How to install and expose an app

<div align="center">
	<img src="https://raw.githubusercontent.com/0x4447/0x4447-article-how-to-think-about-the-AWS-infrastructure/master/x15_App_Stream_2.0/assets/admin_view.png">
</div>

Now that you have a good base to understand the idea behind AppStream 2.0, lets learn how to install an app in a Image and expose it to the user.

As mentioned before we need to focus on the Image section, and lets make one from scratch.

1. On the right menu click on Images
1. Select the ImageBuilder Tab
1. Click `Launch Image Builder`
1. Select a base image, I selected `General Purpose`
1. Click Next
1. Follow the instructions on the screen (nothing fancy here)
1. First time you create the image it will take a while before it will become available
1. Once the image is ready, select the radio button an click `Connect`
1. A remote session will start which will give you access to the whole Windows Machine (operating system)
1. Use Firefox to download the app that you want to install
1. Install the app in the `Program File` folder - don't install it in the user specific folder, the app needs to be available to everyone
1. On the desktop click on the AppStream 2.0 app, named: `Image Assistant`
1. Click `Add Application`
1. Select the app
1. Click next
1. Test the app by switching to the test account
1. Optimize the app by launching them the first time.
1. Done

After the last step you will be disconnected from the session and a new image will be prepared and available in the `Image Registry` which then you can use in your Fleet.

# Things to look for

From my experience AppStream 2.0 is fairly slow in its configuration steps. To the point that an app will start working normally even after 24h. So be patient if an app won't start immediately in the beginning.





