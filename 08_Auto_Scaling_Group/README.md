# Understandign Auto Scaling the right way

AWS Auto Scaling is one of thoes things that actualy is fairly straight forward to understand and work with, but AWS fails to explain the relation betwen the `Launh Configuration` and the `Auto Scalign Group`. Let see if we can do better.

# The General Idea

The idea of Auto Scaling is to have multiple servers with the same exact code and configuration for two main reasons:

- redundancy: one server goes down, the other can still process incommign requests
- spread the load: instead of upgardgin one server to a bigger one you spread the load among multiple servers

To take advantage of this feature you'll alos need a Load Balancer, but more on this in the next sectin.

# Auto Scalign Group dose all the work

In the `Auto Scalign Group` configuration is where you specify how AWS should handle your setup. You cna speficy the minimum ammount of server and the maximum allwoed, you cna specify how the healt of a server should be monitored, how many AZ do you want to use etc.

The `Auto Scalign Group` is the one responsabile to spin a new EC2 server if a server is not reachable, or the app that should be run on the server is not respondign anymore becasue maybe it crashed. If that happens, the `Auto Scalign Group` will spinn more EC2 instances to preserve the minimum ammount of server that we specifyed in the configuration. 

But to work the `Auto Scalign Group` needs to know how to configure the EC2 servers, and this is where the `Launh Configuration` comes to play.

# Launh Configuration brake down

An `Auto Scaling Group` can't exists wihout a `Launh Configuration`, thus the later needs to come first. In this section is where you create a configuration that will be used by `Auto Scaling Group` to create new EC2 instances. The prcoess of creating a `Launh Configuration` is very similar to when you Launch a new EC2 Instance. With the difference that you have to name the `Launh Configuration` etc. You get to specify the following:

1. Choose AMI
1. Choose Instance Type
1. Configure details
1. Add Storage
1. Configure Security Group
1. Review

As you can see this is the identialc setup for a EC2 Instacne, and as you can see from the 3th option, we have access to the `Configure details` where you can specify the `User data`! Meaninig you can reliebliy make EC2 cloens indentical to each other.

