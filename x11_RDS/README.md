# How to Take Advantage of RDS

I must say, AWS' RDS section is the only happy place in their entire offering. It's the most automated of all of the sections, and it fully lives up to the dream of click…click...and it just automatically does stuff for you. But let's start from the beginning.

You'll create and manage all of your AWS databases in the RDS section. There's a selection of different provider to choose from, and it's an easy way to make sure your data is backed up and safe. 

# Backups 

There are three options for preventing database disasters.

1. Regular backups that are snapshots of the whole DB server
2. Multiple DBs in different availability zones
3. Read Replicas

Lets break down each one.

### Regular Backup

When you create a database, you have the option to set up a backup that will take a snapshot of the whole DB every so often (the lowest setting is once a day). The cool thing is that once you set this option, it will do its thing, and you can forget about it. If you want to restore from a snapshot, you'll create a new server based on the selected snapshot.

### Multiple DBs in Different AZs

Similar to an EC2 instance, you can take advantage of your VPC's AZs (Availability Zones). This means that when you create or edit a DB, you can specify that you want to have a copy of the DB in another AZ. Enabling this option will result in an automated system that will take care of itself. 

If the main DB becomes unavailable for whatever reason, AWS will automatically call over the DB copy from the other AZ. The process is fully automatic, and takes 50 to 60 seconds to complete. 

Now, when the original DB comes back online, it will become the new fail over DB. So, in theory, you should be good with this system, since the servers will constantly rotate if something bad happens.

### Read Replica

To take your data resiliency one step further, take advantage of a Read Replica and the AWS Regions. With the two options described above, your data stays in one region, and if that region fails, your data will be lost. It's not likely that this will happen, but you never know. 

RRs are typically used to speed up data delivery to a user. You can put an RR in a region that's closer to the user. The configuration of this database is such that you can only read from it; you can't edit or delete data. These operations must be performed on the main DB, and then they're shared across all of the Read Replicas.

With that in mind, you might think...What if I set up an RR for my main DB in a different region, but never use it?

This is basically a DB backup in a different region. If everything fails in your main DB, you can promote a Read Replica to become a regular DB. Once the operation is completed, you can switch over to it. 

Check the [RDS Backup] folder (https://github.com/davidgatti/How-to-think-about-the-AWS-infrastructure/tree/master/x11_RDS/RDS%20Backups) for more details.
