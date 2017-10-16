#!/bin/bash -x

#
#	Update Apt so we download the latest version of the apps
#
sudo apt-get update -y &&

#
#	Install all the essential tools
#
sudo apt-get install -y python-pip &&
sudo apt-get install -y ruby &&
sudo apt-get install -y wget &&
sudo apt-get install -y curl &&

#
#	Move to the Admin home directory
#
cd /home/admin &&

#
#	Find out the region the server is running
#
REGION=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone/ | sed 's/[a-z]$//') &&

#
#	Download the latest version of CodeDeploy agent
#
wget https://aws-codedeploy-$REGION.s3.amazonaws.com/latest/install &&

#
#	Make the script executable
#
chmod +x ./install &&

#
#	Install CodeDeploy with the default settings
#
sudo ./install auto &&

#
#	Start the CodeDeploy agent
#
sudo service codedeploy-agent start &&

#
#	Add Node repo to Apt source
#
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - &&

#
#	Install the latest version of Node
#
sudo apt-get install -y nodejs &&

#
#	Add
#
touch /home/admin/.env &&
echo TEST_ENV=Hello >> /home/admin/.env

exit 0
