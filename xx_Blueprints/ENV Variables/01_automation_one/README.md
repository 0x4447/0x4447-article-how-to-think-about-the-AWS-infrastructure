# This is it... time to get dirty

Up untill now I tried to chagne your point of veiw and give you a better frame work to help you understand how to think about AWS. Now it is time to actualy build somethig that could do think in an automatci way and help you stream line your work for you project or company that you work at.

# Auto Scaling 

The Auto Scaling menu in the EC2 section is the back bone of automation with EC2. In this section we have two tools at our disposal:

- Launh Configurations
- Auto Scaling Group

### Launh Configurations

This is where you can define a EC2 configuration that whill by applyed to eache EC2 Instacne when started from the `Auto Scaling Group`. Meaniing one, can't work without the other.

### Auto Scaling Group

Is where you define how many EC2 Instances you would like to have with the exact same configuration. Bases on for example a minimum number of servers, CPU load, Traffic in/out or based on waht the waht is seat to a specifci Load Balancer. This means that you can for example say, that i want a minimum o 2 EC2 Servers. This means that AWS will created thoes 2 servers and apply the `Launh Configurations` that you have selected. 

The long ther meffect is that, if one EC2 Instacne becomes unavaiable, or you temirnated a EC2 Instacne, AWS will detect that and create a new EC2 automatically for you. To keep a minimum of 2 servers as speficied. 

# How this works with the Env Variables? 

If you remember form the prebious folder. I told you taht there is a way to edit the Enviroment Variables without loging inside the server. And the AWS way to do is as follows:

1. Go in to the `Launh Configurations` section
1. Make a copy the latest configuration that you would like to edit
1. Go to the  3th tab/step `3. Configure Instance`
1. Unfold the `Advanced Details`
1. Edit the `User data` section
1. Go to the `Auto Scaling Group` end select the Group that you want to edit
1. Click edit, and switch the `Launh Configurations` to the new one that you just made

Ad this moment nothing will happen wiht you EC2 instacnes. To make the settign working, you have to terminate the instances attached to this Group. You can do them all at once if you want, or kill one, waiti untill it coems online, and then terminate the next one.

Only when a EC2 is created from scratch, it will recive the new Configuration. 

# Told you

You might think to yoursefle now, that wait a moment this is to crazy, this is to much work, I was promised for all of this to be simple and painless. Well... I told you, waht Amazon teslls you are 100% lies. To do waht they write in the Marketign meterials, is to do all of this that I'm writing. You see now why other hostign providers that are built on top of AWS are more expensive? Becasue they had to put a extra layer of abstraction to make it work with a clcik of a button.

Follow the White Rabbit 🐇 if you want to find out how deap the lies goes.

# Befroe we go to CodeDeploy

There is a big chance that you jsut had an idea to just use the `User data` section to automatically deploy your coce right? You could wrtie a Basc file that would:

- updated the package manager
- install all you need
- grab the code of the proejct whrom wherever, GitHub, S3, FTP you name it
- configure the projet
- start it 

and done right? Well... you are right nobody will stop you and this is a legitiemate way of doing it.

The down side of this aproach is that the developers won't and should not have access to the EC2 instacnes. They hsould be writign code, and not managing servers, but if we belived that then this aproach is not perfect.

The idea of CodeDeploy is to use the special configuration file that a develoepr adds to the proejct to tell CodeDeploy waht to do. Whichi intiles anywah writign Bash Scripts ;) so we solved nothing in essenc. 

But I want you to understand this difference, which is sattle, nobody talsk about thus create confusion. Meaninig if you are happy with the `User data` section, just use that and be happy. If you want to do it the Hispter way, lets go throught the missery toghether.
