# Zones Vs. Regions or Regions Vs. Zones?

What is the difference right? Amazon have datacenter in different cities, states and countries. You could say that a Region is a different country, but a Region can also be a datacenter in a different time zone. For example the US has different regions named after states. Where other smaller countries are just the name of the country itself, like Singapore.

Zones on the other hand are different. This are datacenter within the same city, or they might be located in the same datacenter, but on a independent hardware network, infrastructure (building), internet connection etc. This means that if a Zone in a Region fails, all the other Zones will still work - since they are independent. 

But let say that California is hit by a earth quake, then all the Zones in that Region will fail. Thus taking down all the Zones you might have.

This Zones Vs. Regions is also another lie that AWS sells you. They want to let you believe that having server all over the world is as easy as just pushing a bunch of buttons, and vuala, you have a global reach. This is achievable only if you deal with Zones. If you want to have your infrastructure spread across Regions (the world), then you'll end up in a substantial nightmare. Because Regions are completely separate from each other. For example

## Load balancer

You can't have a load balancer in one Region and tell it also the send traffic to servers in other one. To acive multi region load balancing you are forced to use another AWS service, which is called Route 53.

## AMI - Amazon Machine Images

If you wanted to create one image and spread it across all the Regions that AWS supports, well good luck, this process even with a clever script will take houers dependign on how big your system images are and to how many regions you sould like to send the to. Why is that? Becasue AWS will litererly have to send a copy fo the seelcted image to each region, no ifferent then sendign a big file over FTP. Just plain ol, copy and wait for the transfer to be over. I once move a 100GB image and it took 1h to do so. 

## Elastic IP

Same situation here, Elastic API can’t be moved between Regions. Each region gets its now sets of Elastic IPs and that is it.

# To sum it up

AWS wants to let you believe that their infrastructure is homogeneous as if it was working as one big machine. But in reality it is very Region specific. Once you create all your infrastructure in one Region, well you are stuck there. And you have to redo all the work that you jsut did once more for each Region. 

It is possible to autoamte this process, but I don't want to overload you with information at this point. My point is to make sure that you udnerstand this sligth but very imporatant difference, betwen Regions and Zones.
