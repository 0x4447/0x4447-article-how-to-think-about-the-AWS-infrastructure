VPC

Finally explained and was to understand

Internet 			-> Is the Internet
Internet Getaway  	-> DSL Modem, Cable modem
Route Tables		-> Router, and remember if you attach the route to another IGW then you need specify a new IGW
Network ACL 		-> Firewall
Subnets			->


Steps to create a VPC from Scratch

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

