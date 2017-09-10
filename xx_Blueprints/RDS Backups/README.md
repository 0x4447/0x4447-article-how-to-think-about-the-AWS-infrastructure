# Backups

So we know how to make your data constantly accessible, but how about backing it up to protect ourselves from a catastrophe? Well you can configure the DB to take a snapshot every single day without taking the database server down, which is actually quite nice.

But what if you wanted to backup the data to the second? Actually this is also easy - I know right, easy, what? I’m serious? Quite serious.

Amazon has this thing called Read Replica. It is basically a regular database that you can only read from. It is normally used in situations where you have a lot of traffic to your site and the majority of the queries that you have to the DB are just read only anyway.

In this situation, you still insert, update and delete from the main DB, but you actually read data from the Read Replica. Even better you can have Read Replicas around the globe with literary one click - I… know right…

What happens in the back is that very time you alter the main DB, it will send an event to all the RR that are connected to it, thus they constable receive in real time all the changes (by the way there is a lag, we are not dealign with quantum entanglement yet).

# Promoting a Read Replica

Since the RR is just a regular DD, it can be promoted to be fully fledged DB with a click of a button. This means that if everything fails in the main DB, you can promote the Read Replica to become a regular DB and switch to it. Thus you lose virtually no data. Just a few minutes of down time.

And this is RDS, it just works as advertised - sadly this is only the exception that proves the rule.