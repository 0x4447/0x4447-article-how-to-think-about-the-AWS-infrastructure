# What is a RDS

Bascialy a place where all your databases (the SQL type ones) live. From this place you can create a new DB from a set of predefined types. Creatign a new DB is actually very similar to when you create a EC2 server with the difference that here you get more automation.

And I'm tlkign about the promised type of automation that AWS lies about EC2. For example when you create a new database server you can tell it to have another copy running in a diferent zone, and when the main instance from one zone goes down for whathever reason the other AWS will automatically switch to the other server in the other zone. Like... automatically and this works. Farly incredible when you look at all the lies that AWS tells you. 

Another thing out of the box are the backups that you get, you can set a DB in a way that evry day a new backup will be made. The difference here is that it will be a snapshot of the whole server. Meaninig you won't get a `.sql` file. So restorign a DB measn selectign a snapshot and spin a new server out of that.  
