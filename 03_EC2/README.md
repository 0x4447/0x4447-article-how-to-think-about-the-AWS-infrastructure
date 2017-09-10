# What is a EC2

This is the easiest part of AWS, where a EC2 is just a fancy name for a regular virtual server/computer. There is nothing fancy or magical here. The only thing to remember is that this are virtual machines, meaning Amazon uses one real computer and then runs many virtual servers, so they can more efficiently use real hardware.

But EC2 is the biggest misconception, the biggest lie that AWS tells you. They say, with EC2 you can scale your application to 1000 of servers all around the world. Sure… in theory yes, but you have to build the whole infrastructure that will do this. There are zero shortcuts here.

# Heroku

This is a small digression, but Heroku for example is a good example of the challenge that it takes to make AWS as advertised. Because Heroku just uses all the lego blogs that AWS provides, the difference is that they took years to develop a solution that just works.

Auto-deployment from GitHub just works
Scaling to more server just works - you move a slider and your app will automatically be deployed to all the new servers. Zero hustle.
Load balancing jut works
Enabling free SSL just works

People say that Heroku is expensive, true, because you have to pay for all the amazing layer that they had to build to make AWS work as the original dream that whoever that came up with AWS had in mind.

# CodeDeploy

Yes, CodeDeploy the biggest lie that AWS spreading in all its marketing materials, the idea that you can just push a commit to GitHub and magically it will be deployed to all your servers - AHAHAHAHAH - thats all I can say. Good luck finding the magic button or setting.

The reality is that CodeDeploy is just a an app and service by the same name that AWS did. This application needs to be installed on each server you want to deploy your code to, and you need to configure it in a way that will work for you.

Because of all the lies that AWS feeds you the picture that they painted is that it is simple, straight forward and you just can enjoy looking at the servers getting the latest code. Where in reality there are a myriad of steps that you have to take to make this whole thing works.

Because of this we need to keep on learning about all the AWS lego blocks before we can event think to start using CodeDeploy.

Lets move to the next section, and lets keep learning about our legos…