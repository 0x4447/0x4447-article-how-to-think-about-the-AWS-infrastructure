# What is a Virtual Private Cloud (VPC)

A AWS VPC is basically a LAN, that have no "phisicall" presence. Meaninig you can build a nettwork hoewer you want remotely on AWS, and this are the tools that are given to you

- **Internet**: well the general Internet
- **Internet Getaway**: is the DSL Modem, Cable Modem, whathever mode. The device that moves the traffci to the internet
- **Route Tables**: The Router that will route the traffci to different devices in our virtual LAN. There is only one Internet Getaway per Router
- **Network ACL**: This is the firwall. Meaninig here you can decide what type of traffic do you wan to allow or block. It is exactly the same idea as ACL for a specifci EC2 instance, with the diference is that here you controll all the traffic gettgin out and in.
- **Subnets**: No idea how to xplain this yet.

# Steps to create a VPC from Scratch

1. Create a VPC
    1. Set a name that makes sense: sequr-app-web-homepage-dev
    2. Set a subset that can be fragmented: 192.168.0.0/16
    3. Enable DNS Hostnames
2. Create a Internet Getway
    1. Then Attach to VPC
3. Then go to Route Tables
    1. Rename the table RT crate to better know what is app
    2. Go to Routes tab and add 0.0.0.0/0 to give the RT access to the internet and select the Internet Getway
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

