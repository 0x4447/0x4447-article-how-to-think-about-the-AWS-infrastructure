# The misterious User data section in EC2

When you create a new instance on the 3th tab/step `3. Configure Instance`, at the bottom of the page you have a folded section called `Advanced Details`, if you unfold it you'll get a form where you can add some data. And this data is the Bash script that was mentioned before.

```
#!/bin/bash
set -e -x
touch /home/admin/.env
echo TEST_ENV=Hello >> /home/admin/.env
```

In our case the script will:

1. Crate a `.env` file in the `/home/admin/` directory
1. Then it will append to the file this text `TEST_ENV=Hello`

This way if we configure out app to read the `.env` when it starts to load all the Environment Variables, the `TEST_ENV` variable will contain `Hello`

# How do you change the values

Well.. you'll have to create a brand new server becasue there is no way to modife the `User data` once the EC2 Instance is created. 

# Once you are calm, keep reading 

Of course you could login in the server and edit that file, restart the server and be happy. And this is a good option. But the idea of this Cloud is to automate evrything to the point where you don't even have access to the server. And this is the scenario that I'm trying to show you - becasue remember, Auto Deployment, magic and all that fluffy stuff.

If you want to manage a server the old fashin way, nobody is stoping you, but if you deployed 20 servers, changign them by hand one by one can become a bit anoying. 

# OK, then - how do we do it the new awesome way?

This is where the `Launch Configuration` and the `Auto Scaling Groups` comes in to play, and I'd like to invite you to the next folder to learn more aobut it.
