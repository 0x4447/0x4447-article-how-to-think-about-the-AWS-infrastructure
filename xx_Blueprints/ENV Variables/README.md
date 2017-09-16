# Nobody talks about Environment Variables

When you read tutorials about deployment, working on a software project for whatever mysterious reason, the env variables are never mentioned, or taken in consideration. But they are the foundation of any web application. Since they allow you to have sensitive data not hard coded inside the code. Thus giving you more security, but also the flexibility to change those credentials without doing changes to the code.

# Before we do anything

Before we start our journey with Auto Deployment, we need to understand how do you work with Env Variables in the AWS platform.

# The general idea

When you start a EC2 instance you have the option to paste or attach a Bash script file, which will be executed immediately after the server gets its network card up and running.

Since we are dealing with a Bash file we can literally do anything we want in it. You could for example, make sure the package manager is up to date form the get go, you could install some packages that you'll need etc. Which is perfect, and obvious to any SysAdmin. But what about env variables.

Well you could write something like this:

```
#!/bin/bash

#
# exit at the first command that fails unexpectedly
#
set -e 

#
# Print each command to stdout before executing it
#
set -x

#
# Create file
#
touch /home/admin/.env

#
# Appedn data to the file
#
echo TEST_ENV=Hello >> /home/admin/.env
```

As you see we make a file which will contain all the Environment Variables that we care about, and this data will be accessible only to people with access to the AWS dashboard if we assume that you've disabled SSH access to the server.

# How to use a file like this

You use a .env file in conjunction with a Foreman app that will read it and start your app with all the Environment Variables that you defined there.

# What to expect from this folder

First we are going to show you the basics how to use the `User data` feature that each EC2 has, and then you'll learn how to manage and edit this thing with the `Launch Configurations` feature.
