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

The “easiest” way to deploy a new commit to multiple server is be just staying in one Region, and deploy to multiple servers scattered across multiple Availability Zones.

The high level concept is that you setup your project on GitHub repo to fire a webhook to CodeDeploy and based on the configuration on both sides. 

But since AWS is Region specific, CodeDeploy is also tied to a specific Region, and there is no way (using what AWS gives us) to trigger a noter CodeDeploy in a different region. 

This is why is it “easier” make Auto Deployment work for just one Region. 

**Multi Region Deployment**

...
