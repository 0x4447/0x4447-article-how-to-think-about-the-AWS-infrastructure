### Target Group

Before we can configure the Load Balancer itself we need to create a Trget Group. This TG will be used by the Load Balancer to know to which servers the traffic should be directed. Bascially a Target Group is nothing more then a folder with a bunch of servers inside. You can group your EC2 instances, and then attach this groups to your load balancers, this way you can more easelliy manage the servers, without editign the Load Balancer itself.

**The setups to create a Load Balancer**

1. Go to the `Target Group` section in the AWS EC2 page
1. Click `Create target group`
1. Name the group
1. Keep evrythign as is
1. But expand the `Advanced health check settings` and set the followng values in the fields: 2, 2, 2, 5
1. Click Create

Once Created

1. Select the Target Group
1. Go to the `Targets` tab
1. Click `Edit`
1. In the `Instances` table bellow you have all the available instances in your Region
1. Select the one that you want
1. Click `Add to registered`

Ony now thoes selected instances will be connected to the Group.

### Load Balancer

This is what decided how to split the traffic among all the servers that you have.

**The setups to create a Load Balancer**

1. Go to the `Load Balancer` section in the AWS EC2 page
1. Click `Create Load Balancer`
1. Select `Application Load Balancer`
1. Set the `Name`,
1. Select two `Availability Zones`, the EC2 that you are going to create further will have to go in the same AZ
1. Go to the next section
1. Don't bother about the HTTPS warninig (in a prodcution setup you'll want SSL enabled)
1. Go to the next section
1. Select a `Security Group`
1. Go to the next section
1. From the `Target group` from the drop down select `Existign target group`
1. From the `Name` select the Target group that you created previously
1. Go to the next section
1. Go to the next section
1. Click Create