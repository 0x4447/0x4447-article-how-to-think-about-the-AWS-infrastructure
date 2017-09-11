# CodeDeploy

All the folders in the repo before this one, were put there to prepare you to the biggest lie of them all… CodeDeploy. Very article on the internet will start by telling how easy it is an how everything will just be automatic and works. 

This is complete nonsense. That is why first we need to understand what really is CodeDeploy, and how can you interact with it, to make it work the way it was advertised. Because the fans idea spread on-line is that you push a commit to GitHub and magically it will be deployed to all your servers - AHAHAHAHAH - thats all I can say. Good luck finding the magic button or setting.

The reality is that CodeDeploy is just a an app that AWS did. Meaning this is just an app that you needs to install on each server you want to deploy your code to.

In addition to that you won’t be able to deploy in a easy way across all the world, because as we learned, AWS is strictly Region specific, and all regions are independent.

Am I’m telling that you can’t have servers all over the globe and push a commit to all of them, no. I’m telling that to achieve that you’ll spend months preparing the infrastructure of this scenario. 

I hope that I can help you cut down on the time need to achieve it, but lets not lie to ourselves, you’ll still need time and dedication to do it.

# Legos with Legos

If AWS are Legos scattered on the ground, then CodeDepoy are even more fine peaces sprinkled around, because you can go about making an auto deployment in dozens of way. Seriously your imagination and level of masohism is your limit.

# In more detail later, but in the mean time

**Availability Zones**

The "easiest" way to deploy a new commit to multiple server is by just staying in one Region, and deploy to multiple servers scattered across multiple Availability Zones.

This way you can setup a GitHub project to fire a webhook to a seelcted CodeDeploy, which will initiate the deployment if configured the right way. 

**Multi Region Deployment**

Since you can't setup GitHub to fire a webhook to multipe CodeDeploys in diffeent regions, we need to chagne the aproach, and the simplest solution is this:

1. You create a Lambda function waht will receive the GitHub webhook notifciation when there is a new commit. 
1. The Lambda function will dowload the compressed repo and save it in a S3 Bucket
1. Any code Deploy that you might have setup will listen to events created by that S3 bucket 
1. A new file will trigger CodeDeploy to get the file and deploy it.

This solution will allow you to trully deploy acros Regions since S3 is not Region specifci. Simple right? Just works right? Wait untill you'll see the real setup 🤣.

# And done!

We arrive at the end, where you should have the bare minimum knoledge require to start to have an undestandign how to put the Lego blocks together. I know there is a lot to take in, but my hope is that I'll shorten the time required to get a graps of the core elemtns of AWS. 

Personally it tooke me 6 months to understand this. I hope you'll do better then me. 

Before you move to the Bluepritns I'd recommend you take a brake from this, and come back with a fresh midn. Becasue this was the easy part. 
