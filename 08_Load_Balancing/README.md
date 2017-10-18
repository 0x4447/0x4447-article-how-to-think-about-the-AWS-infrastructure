# Spread the Traffic Among Many Servers

The load balancer is the backbone of cloud computing. The point of the cloud is to have multiple smaller, less expensive servers that are spread across the internet. Traffic is then split among the servers.

This means that a load balancer is the main entry point for the servers you created using auto scaling.

The first step in creating a working load balancer is to create a "target group". Once you've done this, you'll attach a "load balancer" to that target group. 

### Target Group

The target group tells the load balancer to direct traffic to a particular server or servers. Basically, a target group is nothing more than a folder that contains a bunch of servers. This allows you to group your EC2 instances and then attach the group to your load balancer, which makes it easier to manage the servers without having to actually edit the load balancer.

**Steps to Create a Target Group**

1. Go to the "Target Group" section in the AWS EC2 page.
2. Click "Create target group"
3. Name the group.
4. Keep everything as is...
5. ...but expand the "Advanced health check settings" and set these values in the fields: 2, 2, 2, 5.
6. Click Create.

Once Created:

1. Select the Target Group.
2. Go to the "Targets" tab.
3. Click "Edit".
4. All available instances within your region appear in the "Instances" table below.
5. Select the one you want.
6. Click "Add to registered".

Only now will your selected instances be connected to the Group.

### Load Balancer

Now that we have a group of servers, we can make a new load balancer and attach it to the group.

**Steps to Create a Load Balancer**

1. Go to the "Load Balancer" section on the AWS EC2 page.
2. Click "Create Load Balancer".
3. Select "Application Load Balancer".
4. Set the "Name".
5. Select two "Availability Zones"; the EC2 that you'll create will have to go in the same AZ.
6. Go to the next section.
7. Don't worry about the HTTPS warning (in a prodcution setup, you'll want SSL enabled).
8. Go to the next section.
9. Select a "Security Group".
10. Go to the next section.
11. From the "Target group" drop down, select "Existing target group".
12. From "Name", select the Target group that you previously created.
13. Go to the next section.
14. Go to the next section.
15. Click Create.
