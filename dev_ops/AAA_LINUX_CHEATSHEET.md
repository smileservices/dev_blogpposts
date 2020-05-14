# Important unix commands

## Permissions
These are the "rights" that an user has on certain files or folders. They are read,write and execute. To folders, execute means opening it. Only the file owner and root can modify the permissions.
HOWEVER - a file can be replaced by its copy and thus gain access to setting permissions on it

```
chmod 777 -R {folder}
```


### What is the sudo command?
The root user is enabled to do anything on the system. This makes it very powerful to use everytime, so instead we use users with limited permissions. For a regular user to access the restricted permissions it must use "sudo" in front of the command. It will prompt for the user password afterwards.

To add more users to the sudo privileges you must use the "visudo" command to edit the sudo file. Also, to enable an user to use the sudo command, the user must be a member of the sudo group.

## How to set up users and groups

### What are users
[linuxacademy](https://linuxacademy.com/howtoguides/posts/show/topic/12659-understanding-linux-users-and-groups)
Linux is a multiuser operating system. There are human users - that log into the system - and system users - used for non-interactive actions. Linux treats them the same, only the ID range of them is different. Users can be in multiple groups at once.

The information about users is stored in /etc/passwd file

```
root@ubuntu:~$ head -1 /etc/passwd
root:x:0:0:root:/root:/bin/bash
```

get current user with "whoami"
change user with "su"

### Adding users

If an user is created without setting a primary group, then a group with its name is created and assigned to it

```
adduser --home {home address} -c {comment} {user name}
```

arguments to use:

-c Adds a comment. -c “John from Accounts”

-d Specifies home directory for the user. Use this if the name of the home directory is different from the username. -d /home/accounts/john

-e Specifies the expiration date for the account in YYYY-MM-DD format. -e 2017-01-01

-g Specifies the primary group of the user. The group must already exist in the /etc/group file. -g accounts

-G Specifies the additional groups to which the user belongs. -G employees

-k Specifies the skeleton directory. The contents from the skeleton directory are copied into the user’s home directory. This flag can only be used in conjunction with the -m flag. The default skeleton directory is /etc/skel. -k /skelton/accounts

-p Specifies the password to be associated with this account. This must be an encrypted password. You can assign the password later using passwd command. -p hashed_password

-s Specifies the shell to be associated with this account. -s /bin/bash

-u Specifies the user ID to be used with this account. Without -u flag, the first available user ID will be assigned. -u 1005


### Modifying users

Set password
```
sudo passwd {user}
```

Change the home directory (d flag) and copy the old content (m flag)
```
sudo usermod -m -d {new home dir} {user}
```

Change user's group

Change the main group
```
sudo usermod -g {new group} {user}
```

Add additional groups
```
sudo usermod -aG {group} {user}
```

Replace all additional groups
```
sudo usermod -G {group} {user}
```

Remove user from group
```
sudo deluser {user} {group}
```

### Delete user
This not only deletes the user but also removes all the files that belong to the user including those that are outside the home directory.

to remove user and its files/home folder add -r flag
```
sudo userdel -r {user}
```

## Groups
Groups organize users permissions. When a file/folder is created it belongs by default to the user's primary group. Users that share the same group have the permissions set by the file/folder group permissions. 

create new group
```
groupadd {groupname}
```

### How to change a folder owner and group
```
chown {user}:{group} {target}
```
to use recursivly apply the -R flag

### How to see user's groups
```
groups {user}
```

### Change primary group
```
chgrp {newgroup}
```


# SSH

## Add ssh keys - (attlassian link)[https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html#SetupanSSHkey-ssh2]

```
ssh-keygen
```

How to change ssh config

Use a Match block at the end of /etc/ssh/sshd_config:


## Global settings
```
PasswordAuthentication no
```

## Settings that override the global settings for matching IP addresses only
```
Match address 192.0.2.0/24
    PasswordAuthentication yes
```
Then tell the sshd service to reload its configuration:
```
service ssh reload
```

Show processes and their owners
```
ps -ef | grep nginx
```



## ufw (firewall)
sudo ufw status verbose
sudo ufw enable
sudo ufw allow http
sudo ufw allow https
...
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 22
sudo ufw allow from 15.15.15.51

## ports
see all ports
sudo netstat -tulpn

##tmux
- fix garbled screen
- create .tmux.conf:
sudo tmux show -g | cat > /etc/.tmux.conf
- add this:
set -as terminal-overrides ',*:indn@'


## access address or port (curl, wget)
curl {address}


# Fylesystem

## Empty file without removing
truncate -s 0 filename
> file.txt

## disk space
```
df -h
```

## symlink

(what is a symbolic link)[https://www.cyberciti.biz/faq/creating-soft-link-or-symbolic-link/]

(explanation for soft/hard links)[https://stackoverflow.com/a/185903/1957846]

- create

```
ln -s file1 link1
```

- verify

```
ls -l file1 link1
```

# System check

- available memory

free -m
vmstat -s
htop