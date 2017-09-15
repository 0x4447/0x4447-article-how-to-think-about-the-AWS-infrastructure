# How to manage Environment Variables in EC2

If you are a good developer you should know already that hard coding API Keys and other sensitive data is something that you don't do. The solution to this problem are Environment Variables. Regular hosting providers give you this option and normally when you create a server, there is a section where you an add as many Env Variables as you want. This credentials and other sensitive data is separated from the code, and thus you increase security. Perfect, but how on earth you do the same on AWS!?

I know your pain, it took me a while to find how to do it on AWS, and this is the approach.

When you create a new instance on the 3th tab/step `3. Configure Instance`, at the bottom of the page you have a folded section called `Advanced Details`, if you unfold it you'll get a form where you can add some data. Of course in the AWS style, there is no explanation on what this is, and how to use it (your life can't be to easy). To be fair, there is an explanation when you hover your mouse next to `User data` which reads:

*You can specify user data to configure an instance or run a configuration script during launch. If you launch more than one instance at a time, the user data is available to all the instances in that reservation.*

But how dose this helps us, right? Well let say you pasted the following lines.

```
#!/bin/bash
set -e -x
touch /home/admin/.env
echo TEST_ENV=Hello >> /home/admin/.env
```

As you can see from the first line, this text will be executed at boot time as a Bash script, and yes, whatever you type here will be executed. In our case the script will:

1. Crate a `.env` file in the `/home/admin/` directory
1. Then it will append to the file this text `TEST_ENV=Hello`

This way if we configure out app to read the `.env` when it starts to load all the Environment Variables, the `TEST_ENV` variable will contain `Hello`

# More questions right?

Yes, how do you update a Env Variable? Well... you create a new server... I know... you are thinking why I don't just SSH in to the instance, change the values, and restart just the server? You could but the point is to mimic a service like Heroku, where you don't have to log in anywhere, and thing just happen "automatically".

# This is the basic idea

This is the bare minimum to make it work, in the next folders I'll write about how to use the AWS Lego blocks to make this process as automatic as possible.