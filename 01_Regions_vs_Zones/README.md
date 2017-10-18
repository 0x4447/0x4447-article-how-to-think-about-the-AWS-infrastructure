# Zones vs. Regions or Regions vs. Zones?

What's the difference, right? Amazon has datacenters in various cities, states, and countries. You could say that a region is a different country, but a region can also be a datacenter in a different time zone. For example, the regions in the US are named after states. In a smaller country, like Singapore, a region is simply given the name of the country.

On the other hand, zones are datacenters within the same city. They can also be located within the same datacenter, but on a independent hardware network, infrastructure (building), internet connection, etc. This means that if a zone within a region fails, all of the other zones will continue to work, because they're independent of each other. 

Let's say that California is hit by an earthquake. That region will go down, along with all of its zones.

This zones vs. regions issue is another lie that AWS sells you. They want you to believe that to have servers all over the world, all you need to do is push some buttons, and voila, you'll have a global reach. Working with zones makes this easier. If you want to spread your infrastructure across regions (the world), you'll end up with a substantial nightmare, because Regions are completely separate and independent from each other. 

# For example, some region-specific services

### Load Balancer

You can't have a load balancer in one region and tell it to also send traffic to servers in another region. To achieve multi-region load balancing, you're forced to use another AWS service called Route 53.

### AMI: Amazon Machine Images

If you want to create one image and spread it across all of the regions that AWS supports...Well, good luck, because even if you have a clever script, the process will take hours, depending on how big your system images are and the number of regions you're sending them to. Why is that? It's the same as sending a file over FTP; AWS will literally have to send a copy of the selected image to each region. It's just that plain ol' copy and wait for the transfer to complete. It once took me an hour to move a 100 GB image. 

### Elastic IP

It's the same situation here. Elastic API can’t be moved from one region to another. Each region gets its own sets of Elastic IPs, and that's it.

### CodeDeploy

You have to realize that CodeDeploy is also region-specific. So, in each region where you want to deploy your code, you have to create a carbon copy of your original CodeDeploy.

# To Sum It Up

AWS wants you to believe that their infrastructure is homogeneous, as if it works as one big machine. In reality, it's very region-specific. Once you create all of your infrastructure in one region...well, you're stuck there. And you have to redo all the work you just did for each region. 

It's possible to automate this process, but I don't want to overload you with information at this point. My goal is to ensure that you understand this slight, but very important, difference between regions and zones.
