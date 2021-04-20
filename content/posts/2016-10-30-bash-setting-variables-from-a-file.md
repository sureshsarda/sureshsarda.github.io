---
categories:
- Linux
date: "2016-10-30T00:00:00Z"
tags: []
title: 'Bash: Setting variables from a file'
type: post
---

Shell scripts sometimes get overly complicated and we need lot of configurations stored in file instead of setting them in ten different files which not to mention is error prone. A simple technique would be to write all the configurations in a properties file and read it in all the scripts.

## Let’s do that!
For example we have all these configurations we need to set
```bash
server.build.ip=10.20.0.17
server.stage.ip=10.20.0.77
server.stage.user=stageuser
server.stage.user.sudo=stageadmin
server.stage.log=/var/log/logfile.log
server.demo.ip=10.20.0.83
server.demo.user=demoadmin
server.demo.log=/var/log/error.log
config.project=/opt/foo/bat/config
```
If we wish to do this in all scripts we will have to write each of these variables in all the scripts and change in one of these variables meaning changing all the scripts.
So we could read this file in a script and execute that script in every shell script.

## Executing and setting the variables
```bash
while IFS='=' read -r key value
do
    key=$(echo $key | tr '.' '_')
    eval "${key}=${value}"
done < config
```
Assuming that the config information is stored in `config` file.
Now we could just call this piece of code, or a script that contains this code every time we need these variables.

What it does is, it reads the file line by line and splits the line at `=` (see the part: `IFS='='`?) and assigns the values to `key`,`value`.
Next bash variables can not contain a period. So we replace all the periods with underscores.

After that we simple set the values using the eval statement.

---

Done! You have all your variables stored!
For example if we need the IP address of build server we could use: `$server_build_ip`. Neat!
