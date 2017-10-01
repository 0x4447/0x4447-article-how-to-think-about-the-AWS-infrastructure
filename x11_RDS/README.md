# How to take advantage of RDS

I must say, the RDS section of AWS is the only happy place there is in their whole offering. This section is the most automated of them all, and it fully lives up to the dream of, click… click and it just dose stuff automatically for you. But lets start from the beginning.

RDS is the section where you create and manage all your databases on AWS. You have a selection of different provider that you can choose from, with an eazy way to make sure your data is backuped and safe. 

# Backups 

We have 3 options to make our database disaster prone.

- Regular backus which are snapshots of the whole DB server.
- Multiple DB in different Availability Zones
- Read Replicas

Lets brake down each one.

### Regular Backup

When you create a database you have the option to set it so it will take a snapshot of the whole DB every so often (the lowest settign is once a day). The cool thing is that once you set this option it will do its thing, and you can forget about it. If you want to restore from a snapshot you will create a new server based on the seelcted snapshot.

### Multiple DBs in different AZ

Similar to a EC2 instance, you can take advantage of the AZ (Availability Zones) of your VPC. Meaninig when you create or edit a DB, you can specify that you want the DB to have a copy in another AZ. If you enable this option you'll get an automated system which will take care of itself. 

If the main DB becomes unavailable for whathever reson, AWS will automatically fall over the other DB from the other AZ. The process if fully automatic and takes betwen 50 to 60 sec to complete. 

Now, when the original DB comes back on-line, it will become the new fail over DB, so with this system in theory you should be good. Since the servers will constatly rotate if somethign bad happens.

### Read Replica

You can take your data resilinacy one step further, and take advantage of a Read Replica and the AWS Regions. The two options above, are solutions where your data stayis in the same Region, and if that Region fails your data will be lost. Not likelly, but you never know. 

Normally RR are used to sped up the delivery of data to a user, becasue you can put a RR in a Region closer to the user, and the configuration of this database is such that you can only read from it, you can't edit or delete data. This operations must be performed on the main DB, which then will be shared across all the Read Replicas.

Knowign that, you can stanrt thinking... what if I set up a RR of my main DB in a different Region, but never use it?

This is basically a DB backup in a different Region, and if evrythign fails in your main DB, you can promote a Read Replica to become a regular DB, and then once the operation is completed you can switch over to it. 

Check the 
