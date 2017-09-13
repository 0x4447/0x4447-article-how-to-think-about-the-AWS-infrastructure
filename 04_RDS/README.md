# What is a RDS

I must say, the RDS section of AWS is the only happy place there is in their whole offering. This section is the most automated of them all, and it almost fully lives up to the dream of, click… click and it just dose stuff automatically. But lets start from the beginning.

RDS is the section where you create and manage all your databases. You have a selection of different provider that you can choose from, and shockingly it is very easy to create resiliant databases. 

# Backups 

We have 3 options to make our database disaster pronet. Meaninig there are 3 differetn way to backup our data up to the seccond. 

- Regular backus done once a day
- Multiple DB in different Availability Zones
- Read Replicas

Lets brake down each one.

**Regular Backup**

When you create a database you have the option to set it so it will take a snapshot of the whole DB every so often, and you can as low as one day. The cool thing is that once you set this option it will do its thing, and you can forget about it.

**Multiple DBs in different AZ**

Similar to a EC2 instance, you can take advantage of the AZ (Availability Zones) of your VPC. Meaninig when you create or edit a DB, you can specify that you want the DB to have a copy in another AZ. If you enable this option you'll get a automated system which will switch automatically to the other DB from the other AZ.

If the main becomes unavailable for whathever reson, AWS will automatically fall over the other DB from the other AZ. The process if fully automatic and takes betwen 50 to 60 sec to complete. 

Now, when the original DB comes back on-line, it wil be come the new fail over one, so with this system in theory you should be good. Since the servers will constatly rotate if somethign bad happens.

**Read Replica**

You can take your data resilinacy one step further, and take advantage of a Read Replica and the AWS Regions. The two options above here, are solutions where your data stayis in the same Region, and if that Region fails your data will be lost. Not likelly, but you never know. 

Normally RR ar used to sped up the delivery of data to a user, becasue you can put a RR in a Region closer to the user, and the configuration of this database is such that you can only read from it, you can't add, edit or delete data. This operations still need to be performed on the main DB. But since this operations are more rare. You get a nice global solution.

Knowign that, you can stanrt thinking... what if I set up a RR of my main DB in a different Region, but never used, it would just be there? And you'd be right :)

This is basically a DB backup in a different Region, and if evrythign fails in your main DB, you can promote a Read Replica to a regular DB, and then once the operation is completed you can switch over to it. 

We'll go in more details in the Blueprint section.
