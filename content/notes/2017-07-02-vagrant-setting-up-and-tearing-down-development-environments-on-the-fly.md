---
date: "2017-07-02T00:00:00Z"
excerpt: Vagrant reduces effort taken to set up a machine. Once you have couple of
  snapshots, you can simple create and destroy them on fly. Every time you want to
  try something new, you can fire up a new machine and destroy once you are done.
  Clean slate for all your experiments.
tags:
- devops
- Elasticsearch
- kafka
- storm
title: Vagrant - Setting up and tearing down development environments on the fly
---
I try a lot of new things and this trying new things forces me to install something new. I hate installing new packages/frameworks just because I want to try it. Nothing is removed cleanly later and your OS is left with configuration files, user files, hidden directories and lot more trash created by this new package. **I hate that!**

Up till now, I had no option. I used to install, then remove and after a while lot of unwanted files would be lying here and there. My solution was to format my computer once in a while and start afresh (ruthless solution, but works).

Recently I joined [Frrole.ai](http://frrole.ai/), an AI startup that specialized in providing insights from social data. As this is a small company, lot of my time goes in managing the server infrastructure. Creating dev/testing environments, adding machines, creating new clusters, etc. When I started here, I had little idea of how to manage infrastructure. While not exactly part of my job description, I started exploring this realm. Soon I was introduced to two beautiful tools - [Vagrant](https://www.vagrantup.com/) and [Ansible](https://www.ansible.com/).

Here's Vagrant's introduction from it's [official docs](https://www.vagrantup.com/intro/index.html#introduction-to-vagrant):

> Vagrant is a tool for building and managing virtual machine environments in a single workflow. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases production parity, and makes the "works on my machine" excuse a relic of the past.

When I first read this, I was like <em>eh.. whatever. </em>Left the tool and did not turn back to it for next 2 weeks. I could not understand how it could help me in this marketing oriented introduction.

Here's my use case of Vagrant:

> Vagrant is a tool to setup virtual machines quickly so that you can try lot of new things without worrying about what all packages you are installing. Also, it focuses on automation so you don't have to setup same things again and again, and you can delete a machine when you feel like.

*Okay. Better.*

Now, these VMs can be on your local machine or you could use some cloud provider. No more opening the super slow web portal of Azure, and setting up a machine which takes like forever (I know there is CLI and tools to automate this. But I am a developer and I don't have time to learn these things). Vagrant will do it for you. It will do everything for you.

Once your machine is ready, you can provision it using Ansible and many other tools which Vagrant provides out of the box.

## How does this help me?
So the other day I wanted to create a ML pipeline using Kafka, Storm, ElasticSearch and some Python endpoint. Someone who has worked with these tools will know how tedious is to setup all these tools with ZooKeeper and the plug-ins for each of them - Kibana, Kafdrop, etc. I have a Vagrant file that sets up the machine for me and then an Ansible Playbook that configures all these things. All I got to do is execute couple (3 precisely) of commands.

When I am done with my POC, I can simply destroy this machine without thinking about the effort required to set up these things, because there was not effort!

## Conclusion
Vagrant reduces effort taken to set up a machine. Once you have couple of snapshots, you can simple create and destroy them on fly. Every time you want to try something new, you can fire up a new machine and destroy once you are done. Clean slate for all your experiments.

