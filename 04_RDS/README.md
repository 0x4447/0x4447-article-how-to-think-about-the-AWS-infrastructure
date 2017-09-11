# What is a RDS

I must say, the RDS section of AWS is the only happy place there is in their whole offering. This section is the most automated of them all, and it almost fully lives up to the dream of, click… click and it just dose stuff automatically. But lets start from the beginning.

RDS is the section where you create and manage all your databases. You have a selection of different provider that you can choose from, and shockingly it is very easy to create a server that will fix over a mirror copy. 

# Lets take a step back

Similar to the whole AWS infrastructure, you get a set of legos, and it is up to you to put them together in a way that will make your data resilient and safe. Even thought in the case of RDS there are very little Lego blocks to choose form, so it is much easier to reason about this part of AWS

# AZ Setup

As from what you learned form the other sections, the Availability Zone is a Subnet in your VPC, which physically separate your server from each other. Knowing this, there is a feature when you create a server where you can specify that you want to create the new DB with AZ support (mmm acronyms). This option will create actually two databases (you’ll pay for both) in two different AZ in the same Region of course.

Now. Let say that the database that is on a AZ will go down for whatever reason, AWS will automatically promote the other DB that is in the other subnet as the main one, and business will move as usual. 

Of course the switch will take up to 30 seconds, so during that time your app will not work, but other then that. Everything will just happen automatically. And if the fallen DB will come back on-line it will become the backup one.

Amazing right? It is so nice to see what was promised to us to actually work.

This is simple and straight forward, if you would like to know how make backups that are up to the second, go in to the Blueprint section and check the articles there.
