# What is a Virtual Private Cloud (VPC)

AWS VPC is basically a LAN with its own router at the edge which gives us a nice private network that will contain all of our stuff. This way nobody on the AWS infrastructure can get access to it.

This tool is a virtual representation of what you did back in the day at the company office with real hardware.

This are the tools at your disposal:

- **Internet**: well the general access to the Internet. If you don’t attach this part to the VPC your servers won’t be able to access the internet and anyone on the internet won’t be able to access those servers.
- **Internet Getaway**: is the DSL Modem, Cable Modem, etc. The device that connects the outsie wordl with your internal infrastructure.
- **Route Tables**: The Router that will route the traffic to different devices in our virtual LAN. There is only one Internet Getaway per Router, meaning you can’t for example have two separated internet connections in one VPC.
- **Network ACL**: This is the firewall. Meaning here you can decide what type of traffic do you wan to allow or block. It is exactly the same idea as ACL for a specific EC2 instance, with the difference that here you control all the traffic getting in and out in the VPC.
- **Subnets**: a part of a larger network, so you can fragment your network, and this are the Zones within a Region.

# What is the point of makign a VPC?

Two things, keepin everything mroe organized, but most importantly, keeping your infrastructure more secure. 

When you create a AWS account for the first time you'll get a `default` VPC where every service will be created by default. This is OK for testing and gettign a server or service up and running and connected to the internet. But this is not a good aproach when you are running a prodcut for the public, becasue it is a very insecure and dangerous setup to have evrythign in one nettwork. 

**Example**

Let say you want to have 2 environments, one for production and the other for development. If you put evyrthing in one VPC, all your servers will be able to access each other, sicne they are in the same nettwork. Where if you create 2 seaprated VPC, one called Prodution and the Other Development, then even if someoen gains access to the development servers, they won't be able to access the production onces. 

# Steps to create a VPC from Scratch

If you go to the VPC Dashboard, you'll see on the left a menu with all the Lego blocks available to you. But they are not in the right order, the are jsut scatered on the floor. The list below is in the right order to create a VPC.

1. Your VPCs
    1. Create a VPC
    1. Set a name that makes sense: example-web-homepage-dev
    1. Set a subset that can be fragmented: 192.168.0.0/16
    1. Enable DNS Hostnames
1. Internet Gateways 
    1. Create a Internet Getaway
    1. Then Attach it to the VPC created
1. Then go to Route Tables
    1. Rename the table RT crate to better know what is app
    1. Go to Routes tab and add 0.0.0.0/0 to give the RT access to the Internet and select the Internet Getaway
1. Create Network ACL
    1. Attach it to the VPC
    1. Select the ACL and makes sure the right traffic is set from outbound and inbound
1. Create a bunch subnets
    1. 192.168.0.0/24
    1. 192.168.1.0/24
    1. 192.168.2.0/24
    1. 192.168.3.0/24
    1. 192.168.128.0/24
1. Then each subne tenable public DNS

