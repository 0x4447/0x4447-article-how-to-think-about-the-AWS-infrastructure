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

But I want you to understand this difference, which is sattle, nobody talsk about thus create confusion. Meaninig if you are happy with the `User data` section, just use that and be happy. If you or someoen alse on top of you wants to do it the Hispter way, then you'll have to learn how to do it the CodeDeploy way.
