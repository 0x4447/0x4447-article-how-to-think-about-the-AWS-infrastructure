# What is an EC2?

This part of AWS is the easiest to understand. EC2 is nothing more than a fancy name for a regular virtual server. The only thing you need to remember is that EC2 instances are virtual machines. Amazon uses one real computer to run a bunch of virtual machines that more efficiently manage the resources.

On the other hand, EC2 is also AWS's biggest misconception, the point where all of the lies begin. 

All of the demos presented at various events show how easy it is to scale a web app on thousands of EC2 instances all over the world. But we already know that regions are separated from each other. So how can this be? Well it can be, but it takes a month of work - writing loads of code and creating Bash script - to actually make this happen.

There's no magic button...I repeat, there is no magic button. Just plain old servers that you have to put together.

# Heroku

This is a slight digression, but Heroku is a perfect example of what you can do with the AWS infrastructure. Heroku is built on top of AWS. Heroku is AWS, but with an easy-to-use UI, plus some extra features: 

1. True autodeployment
2. True autoscaling with just a slider
3. Load balancing that works out of the box
4. SSL certificates that are easy to use and free 

To build what Heroku did is a major undertaking. I hope that by the end of this article/tutorial, you'll know how to do something similar. But it will never look as nice or be as flexible as Heroku.

People say that Heroku is expensive, but there's a good reason for that. Once you get to know what AWS really is, you'll understand that the work that went into making this service was truly invaluable.
