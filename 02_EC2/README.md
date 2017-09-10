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

