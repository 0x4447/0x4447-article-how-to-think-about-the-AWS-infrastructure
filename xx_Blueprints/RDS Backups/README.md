We learned from the RDS section that databases on AWS are fairly easy to work with, compared to the rest of the tools at our disposal. But only if we are in the same Region, if we wanted to brake out of a Region with our DB, we need to look at Read Replicas. Thankfully thy are also fairly easy to work with. Suprisign, but it trully is. 

# Creating a Read Replica

Once you have your main DB up and runninig, from the options menu you'll have the ability to attach a Read Replica to it. You can have as many RR as you want and in any Region that you want. 

- RR are of course read only
- RR can be in different Region 
- You don't have to use them, they can jsut be and recive data from the main DB
- You can promote a RR to become a regulard DB, with read, write, edit and delete options
- RR have the same user name and password from the main DB, only the endpoint chagnes (URL)

# Promoting a Read Replica

Converting a RR in to a regular DB is as simple as clikcign a button in the Dashboard. The things to remember are this:

- the process is not instant
- even dought the credentials are the same the URL to the DB is different, so you'll have to edit your server(s)
- once converted you have to enable manualy AZ support, yes don't forget to add support for that once you switched
- all the other RR that were recivign data from the decised DB, will stop workign, and you'll have to delete them. You can't tell them to start gettign data from the newly promoted RR. 
- you'll have to create new RR from the newly promote Read Replica. 

As you can see, after promotign a RR, the process to have what you had is manual, but i'l give AWS a pass here, since if you need to go over this scenario, it measn that some serious stuff happend anyway, and this is not a switch that you want to do evry other week.
