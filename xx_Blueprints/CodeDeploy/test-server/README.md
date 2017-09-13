# Test AWS

This repo is to be used as a test bed for AWS services.

# Not just a simple Hello World

This repo not only displays a simple hello world app, it alos hase some basic features usefull when testign different AWS features.

Features:

- **display the server IP**: usefull to test the Load Balancer and see how the servers are switched.

# Logs of code Deploy where all the good stuff is to find out what is wrong

cat /var/log/aws/codedeploy-agent/codedeploy-agent.log

sudo dpkg -s codedeploy-agent


sudo service codedeploy-agent status


```
#!/bin/bash
set -e -x
touch /home/admin/.env
echo TEST_ENV=Hello >> /home/admin/.env
```

# Webhooks check

