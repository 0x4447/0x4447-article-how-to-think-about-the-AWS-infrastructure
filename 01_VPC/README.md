# What is a Virtual Private Cloud (VPC)

A AWS VPC is basically a LAN with its own router at the edge which gives us a nice private network that will contain all of our stuff. This way nobody on the AWS infrastructure can get access to it.

This tool is a virtual representation of what you did back in the day at the company office with real hardware.

This are the tools at your disposal:

- **Internet**: well the general access to the Internet. If you don’t attach this part to the VPC your servers won’t be able to access the internet and anyone on the internet won’t be able to access those servers.
- **Internet Getaway**: is the DSL Modem, Cable Modem, etc. The device that moves the traffic to the internet
- **Route Tables**: The Router that will route the traffic to different devices in our virtual LAN. There is only one Internet Getaway per Router, meaning you can’t for example have two separated internet connections in one VPC.
- **Network ACL**: This is the firewall. Meaning here you can decide what type of traffic do you wan to allow or block. It is exactly the same idea as ACL for a specific EC2 instance, with the difference that here you control all the traffic getting in and out in the VPC.
- **Subnets**: a part of a larger network, so you can fragment your network even further.

# Steps to create a VPC from Scratch

1. Create a VPC
    1. Set a name that makes sense: example-web-homepage-dev
    2. Set a subset that can be fragmented: 192.168.0.0/16
    3. Enable DNS Hostnames
2. Create a Internet Getaway
    1. Then Attach to VPC
3. Then go to Route Tables
    1. Rename the table RT crate to better know what is app
    2. Go to Routes tab and add 0.0.0.0/0 to give the RT access to the Internet and select the Internet Getaway
4. Create Network ACL
    1. Attach it to the VPC
    2. Select the ACL and makes sure the right traffic is set from outbound and inbound
5. Create a bunch subnets
    1. 192.168.0.0/24
    2. 192.168.1.0/24
    3. 192.168.2.0/24
    4. 192.168.3.0/24
    5. 192.168.128.0/24\
6. Then each subnetenable public DNS

