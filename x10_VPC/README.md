# What is a Virtual Private Cloud (VPC)?

AWS' VPC is basically an LAN (Local Area Network). The distinction is that you'll get a virtual router attached to a VPC, as opposed to a switch, that allows you to create an LAN, but doesn't give you routing capabilities. This means that your LAN's traffic can't go outside to a different network. But AWS allows you to configure the virtual router in a way that you can prevent traffic from escaping your LAN, or gaining access to the Internet.

The VPC Dashboard includes following tools for to building out a Virtual Private Cloud:

**Internet** General access to the Internet. If you don’t attach this part to the VPC, your servers won’t be able to access the internet and others will be unable to access those servers.
**Internet Getaway** DSL Modem, Cable Modem, etc. The device that connects the outside world with your internal infrastructure.
**Route Tables** The router that directs traffic to various devices in your virtual LAN. There is only one internet gateway per router. For example, you can't have two separate internet connections for one VPC.
**Network ACL** The main firewall. This allows you to decide what type of traffic you'll allow or block. It's exactly the same idea as the ACL for a specific EC2 instance. The difference is that here you control all traffic entering or exiting the VPC.
**Subnets** Part of a larger network that allows you to fragment your network. These are also the availability zones within a region, meaning each subnet will end up in its own infrastructure, giving you grater resilience.

# What's the Point of Making a VPC?

There are two reasons for creating a VPC: It will help keep everything organized. Most importantly, it will make your infrastructure more secure. 

When you first create an AWS account, you'll have a "default" VPC that will add every service by default. This is okay for testing and getting a server or service up and running. But it's not a good aproach when running a product for the public, because it's a highly insecure and dangerous set-up. 

**Example**

Let's say you'd like to have two environments, one for production and another for development. If you put everything in one VPC, all of your servers will be able to access each other, since they're in the same network. If you create two separate VPCs, named Production and Development, even if someone gains access to the servers for Development, they won't be able to access the servers in Production, which are on a separate nettwork (unless you allow the two VPCs to talk to each other). 

# Steps for Creating a VPC from Scratch

In the VPC Dashboard, you'll see a menu on the left that makes all of the Lego blocks available to you. But they're not in the right order; they're scatered on the floor. The list below shows the correct order of steps for creating a VPC.

1. Your VPCs
    a. Create a VPC.
    b. Set a name that makes sense: example-web-homepage-dev.
    c. Set a subset that can be fragmented: 192.168.0.0/16.
    d. Enable DNS Hostnames.
2. Internet Gateways 
    a. Create an internet gateway.
    b. Attach it to the VPC you created.
3. Go to Route Tables
    a. Rename the table RT 
    b. Go to the Routes tab and add 0.0.0.0/0 to give the RT access to the internet. Select the internet gateway.
4. Create Network ACL
    a. Attach it to the VPC.
    b. Select the ACL, and ensure that the correct traffic is set for outbound and inbound.
5. Create a bunch of subnets
    a. 192.168.0.0/24
    b. 192.168.1.0/24
    c. 192.168.2.0/24
    d. 192.168.3.0/24
    e. 192.168.128.0/24
6. Then each subnet tenable public DNS

