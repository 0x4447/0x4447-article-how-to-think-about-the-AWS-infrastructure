# The Mysterious User Data

Each EC2 Instance has a feature that isn't thoroughly explained or even discussed. It's mysteriously named "User Data", and it's hidden in the third tab/Step 3, "Configure Instance" under a folded section called "Advanced Details" when you create a new EC2 instance.

If you unfold this section, you'll have a form in which you can add some data. If you paste or add a Bash script, the script will execute when the new machine boots and after the network cards comes on-line.

This enables you to have identical servers each time you start a new instance, just by pasting a Bash script that you designed.

# Example

This means that you can ensure that you have all needed applications, language support, and more. But it's not limited; you're able to edit, change, delete, or reshuffle any file in the system.

# Env Variables for Your App

It also means that if you pasted a script like this...

```
#!/bin/bash

#
# Print each command to stdout before executing it
#
set -x

#
# Create file
#
touch /home/admin/.env

#
# Append data to the file
#
echo TEST_ENV=Hello >> /home/admin/.env
```

...you could have Environment Variables that are dynamic for each deployment and not accessible to anyone besides the application itself.

# User data is Powerful, but a Lot of Work

Make no mistake. This is something you'll have to do yourself. There's no automation, one click to make it work, etc. You'll need to know how to write Bash scripts, and you'll have to invest your time in debugging, testing, and ensuring that they work. This is time consuming, because EC2 servers don't boot instantly. I also recommend that you don't take it for granted that a script that works on your local machine may not work 100 percent on an EC2. Always test on AWS before you call it a day.

# How to Debug User Data

Again, anything you type in the "User data" field will be executed only after the network card comes online. All logs will be sent to "syslog". To see what's happening - or what happened - you can either:

**Tail**

`sudo tail -f /var/log/syslog`

**Cat**

`cat /var/log/syslog`

In the logs, look for `cloud-init` to determine what your script did.

# What is Cloud-init?

Cloud-init is the defacto [multi-distribution package](http://cloudinit.readthedocs.io/en/latest/index.html) that handles early initialization of a cloud instance. If you want to do more with it, check the documentation.

# Can I See the User Data of an Instance?

You definitely can. Do it like this:

1. Select the instance you want to check.
2. Click the "Action" dropdown menu.
3. Hover over "Instance Settings".
4. Select "View/Change user Data".

# Can I Change an Instance's User Data?

Yes! To do so, stop the instance and repeat the steps from above, since the "User data" is only applied when the system boots. But remember that if your script has already run on the machine, running the same code can cause issues if it's not done correctly. You're not running the Bash script on a fresh installation anymore.
