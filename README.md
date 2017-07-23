# how to think about the AWS infrastructure

---

## 🚧🍺 Work In Progres... 

---

The biggest ommision in documentation is the frame of reference and if you check my GitHub profile you'll see that I alasy try to build one first before I dive in to the nitty gritty details. Whoever write documentation thing that we develoeprs or SYsAdmisn will eventually understadn how to use whathever is thronw at us. True, but why wastign time commign up with a freme of reference which will start wrong and have the wrogn asumtpion before you'll have osmethign that make sesne. When the expert in that topic could save us so much time and frustration. We are not telepatic, and if you luck telepaty as I do, then this guide should help you understand how to go about AWS. Since I spend the past 6 months wrappign my head around this whole infrastructure. 

# The lie Amazon tells us

Evrywhere you watch, read and talk to will tell you that AWS is amazign, evrythign is automatic, scales idefinetly, and is just few clciks away. This is complete nonsesne, and the sooner you realzie this the sooner you'll understand that you have to put all the epaces together, write code and create configurations fiels to make it all work autoamtically and automagicaly, as advertised.

# Lego blocks

You have to think about AWS like legos bricks scatered all on the floor with no instruction what to do with them. You have documentaiton for each individial pace, but no guides or tutorial with ideas what could you created with all this peaces. The most sceptial of you might say that there are tutorials out there done by AWS people. But the reality is that either there were wrtien 5 years ago, and the AWS interface alone chagned dtrastically sicne then, or the steps now are different and nobody bothere udpatign thoes tutorials. I argued a lot with AWS Tech Support and they walsy came back to me teelgi nthey will notficy the outor to dupate thoes posts, but nothign never happend. 

If a tutorial is not workign for you, the problem is not with you, it is with the tutorial iteslfe. 

# Zones Vs. Regions or Regions Vs. Zones?

What is the difference right? Amazon have datacenters in different cities, states and countries. You could say that a Region is a different country, but a Region can also be a datacenter in a different time zone. For example the US hase different regions named after states. Where other smaller countries are just the name of the country. 

Zones on the other hand are different datacenters within the same city, or they might be servers in the same datacenter but on a independent nettwork, infrastrucutre, internet conenction etc. This means that if a Zone in a region fails, all the other Zones will still work - since they are indepenedent, but let say that the California datacenters will be hit by a earth quake, then all the zones in that Region will fail. Thus takign down all the Zones.

This Zones Vs. Regions is alos another lie that AWS sells, where they want to let you belvie that havign server all over the world is as easy as jsut pushing a bunh of buttoens, and vluala, you have a global reach. This is achivable only if you deal with Zones. If you want to have your infrastructure spread across Regions, then you'll end up in a substantial nightmare. Becasue Regions are a compellty separate from each other. For example

## Load balancer

You can't have a load balancer in one Region and attached it to servers from another one...

## IAM - so called sytem iamges

They are Region specifci, and you have to phisically copy thoes images betwne Regions. If you wanted to create one image and spread it across all the Regions that AWS supports, well good lick, this proces even with a clever script will take proably more then 24 if you coutn a 8G image. If you have something bigger, o well, you'll wait days before you finish the whole process. 

AWS wants to let you belive that their infrstructure is homogeneous as if it was workign as one big machine. But in reality it is very Region specific. Once you create all your infrstructure in one Region, well you are stuck there, and to setup the infrastructure the way AWS adevrtise it - well, let say I get goosebumps jsut thinking about it. It literarly requrie writign lots of code (maybe scripts if you are not a develoepr per se) to make it all works. Whichi means it is not a trivial things - it is a serios, serious undertaking. 

But by the end of this article you should be able to make it work 😱🤞.

# The Structure of this repo

Each foder will contain a self contained tutorial of a specific AWS feature, to help you focus on on thing at the time before we end up buildign a full fledged solution. Be patient and take your time, becasue AWS is time consuming.

# The End

If you've enjoyed this article/project, please consider giving it a 🌟 or donate.

- [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/gattidavid/25)
- [![Star on GitHub](https://img.shields.io/github/stars/davidgatti/how-to-think-about-the-AWS-infrastructure.svg?style=social)](https://github.com/davidgatti/how-to-think-about-the-AWS-infrastructure/stargazers)
- [![Watch on GitHub](https://img.shields.io/github/watchers/davidgatti/how-to-think-about-the-AWS-infrastructure.svg?style=social)](https://github.com/davidgatti/how-to-think-about-the-AWS-infrastructure/watchers)

Also check out my [GitHub account](https://github.com/davidgatti), where I have other articles and apps that you might find interesting.

---

## Where to follow

You can follow me on social media 🐙😇, at the following locations:

- [GitHub](https://github.com/davidgatti)
- [Twitter](https://twitter.com/dawidgatti)
- [Instagram](https://www.instagram.com/gattidavid/)

## More about me

I don’t only live on GitHub, I try to do many things not to get bored 🙃. To learn more about me, you can visit the following links:

- [Podcasts](http://david.gatti.pl/podcasts)
- [Articles](http://david.gatti.pl/articles)
- [Technical Articles](http://david.gatti.pl/technical_articles)
- [Software Projects](http://david.gatti.pl/software_projects)
- [Hardware Projects](http://david.gatti.pl/hardware_projects)
