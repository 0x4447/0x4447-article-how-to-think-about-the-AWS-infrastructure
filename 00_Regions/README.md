# Zones Vs. Regions or Regions Vs. Zones?

What is the difference right? Amazon have datacenter in different cities, states and countries. You could say that a Region is a different country, but a Region can also be a datacenter in a different time zone. For example the US has different regions named after states. Where other smaller countries are just the name of the country itself.

Zones on the other hand are different datacenter within the same city, or they might be servers in the same datacenter but on a independent network, infrastructure, internet connection etc. This means that if a Zone in a region fails, all the other Zones will still work - since they are independent, but let say that California will be hit by a earth quake, then all the zones in that Region will fail. Thus taking down all the Zones.

This Zones Vs. Regions is also another lie that AWS sells. They want to let you believe that having server all over the world is as easy as just pushing a bunch of buttons, and vuala, you have a global reach. This is achievable only if you deal with Zones. If you want to have your infrastructure spread across Regions (the world), then you'll end up in a substantial nightmare. Because Regions are a complete separate from each other. For example

## Load balancer

You can't have a load balancer in one Region and tell it also the send traffic to servers in other one.

## AMI - Amazon Machine Images

They are Region specific, and you have to physically copy those images between Regions. If you wanted to create one image and spread it across all the Regions that AWS supports, well good lick, this process even with a clever script will take probably more then 24 if you count a 8G image. If you have something bigger, o well, you'll wait days before you finish the whole process.

AWS wants to let you believe that their infrastructure is homogeneous as if it was working as one big machine. But in reality it is very Region specific. Once you create all your infrastructure in one Region, well you are stuck there, and to setup the infrastructure the way AWS advertise it - well, let say I get goosebumps just thinking about it. It literally require writing lots of code (maybe scripts if you are not a developer per se) to make it all works. Which means it is not a trivial things - it is a serious, serious undertaking.

## Elastic IP

Same situation here, Elastic API can’t be moved between Regions. Each region gets its now sets of Elastic IPs and that is it.