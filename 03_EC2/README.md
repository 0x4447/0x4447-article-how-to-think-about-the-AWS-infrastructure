# What is a EC2

This is the easiest part of AWS to understand. EC2 is nothing more then a fancy name for a regular virtual server. The only thing to remember is that EC2 instances are virtual machines, meaning Amazon uses one real computer to run a bunch of virtual machines to more eficently manage the resoruces.

On the other hand EC2 is the biggest misconception, the starting point of all the AWS lies. 

All the demos done at various events shows how easy it is to scale a web app on thousends of EC2 instances all over the world. But we know already that Region are separated from each other. So how can this be? Well it can after a month fo work, lods of code written, and Bash script made to actually make this happens.

There is no magic button... I repeat, there is none. Just plain old servers that you have to put together.

# Heroku

This is a small digression, but Heroku is a perfect example of waht you can do with the AWS infrastructure. Becasue Heroku is built on top AWS - Heroku is AWS but with easy to use UI, end extra featureslike 

- true autodeployment
- true autoscalign with just a slider
- load balancign that works out of the box
- easy and free to sue SSL certificats 

To build what Heroku did is I undertakign, which I hope by the end of this article/tutoria you'll know how to do, but it will never look so nice and it won't be as felxible as waht Heroku did.

People say taht Heroku is expensive, there is a good reason for that - the work that went in to makign this whole service is trully unvalibable once you get to know waht AWS really is.
