# What is AWS Lambda

I'll say that this is the simplest and most fun tool AWS provides, and is quite usefull. The premise is that you run some code in on this service and you don't have to manage a server to do that (no EC2 configuration). The interestign thing is that you are charged by the ammount of time your code runs, so the cool thing is that you have that just runs from time to time, or you jsut build a solution that is not yet popular, your infrastructure cost will be minimal. 

# Waht Lambda is good for

I would say for two main things, to build an API, and to react to certain events, like webhooks. So for example is a webhook runs only once a month, then your code will be there doing nothing and you won't be charged. 

If you want to create an API with a lambda Function you'll need to use AWS API Getway. This way you can create an endpoitn/route, then when invoced by someone it will trigger a Lambda function. For example get and adress of a specifci user, or a list of the most popular itesm in a shop, since a lambda function can connect to a DB like a regular app. 

# Don't work with Lambda dirrectly

The best way to work with Lambda is to use a fremework, and my favorite one is https://serverless.com. The docuemntation is nice, and you get a nice tool that will configure evrythign needed autoamtically for you, so you don't have to al with the non existign autoamtion of AWS ;)
