We learned in the RDS section that, compared with the other tools we have at our disposal, AWS databases are fairly easy to work with. But this only applies if we stay within the same region. If we want to break out of a region with our DB, we need to look at Read Replicas. Thankfully, they're also fairly easy to work with. Suprising, but true. 

# Creating a Read Replica

Once you have your main DB up and running, you'll have the ability to attach a Read Replica to that DB through the Options menu. You can have as many RRs as you want, in any region you want. 

- Of course, RRs are read-only.
- RRs can exist in different regions. 
- You don't have to use RRs; they can just be there and receive data from the main DB.
- You can promote an RR to become a regular DB, with read, write, edit, and delete options.
- RRs have the same user name and password as the main DB; only the endpoint (URL) changes.

# Promoting a Read Replica

Converting an RR into a regular DB is as simple as clicking a button in the Dashboard. Here are some things to remember:

- The process is not instant.
- Although the credentials are the same, the database URL is different, so you'll have to edit your server(s).
- Once the conversion is complete, you have to manually enable AZ support.
- All previous RRs that received data from the decised DB, will stop working, so you'll have to delete them. You can't tell them to start getting data from the newly promoted RR. 
- You'll have to create new RRs from the newly promoted Read Replica. 

As you can see, after promoting an RR, the process to have what you had is manual. But I'll give AWS a pass here, since if you need to go through this scenario, some serious stuff has happend, anyway. This is not a switch that you want to make every other week.
