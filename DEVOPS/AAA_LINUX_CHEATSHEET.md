Title: Important Unix Commands
Slug: important-linux-commands
Tags: linux, unix, cheatsheet
Category: Linux
Summary: Most common linux concepts and commands: files permissions, users, scripting, groups, ssh, filesystem, snap packages 
Date: 2018-02-03 10:20
Modified: 2020-07-05 19:30

### Intro
Most common linux concepts and commands: files permissions, users, scripting, groups, ssh, filesystem, snap packages

### Permissions
These are the "rights" that an user has on certain files or folders. They are read,write and execute. To folders, execute means opening it. Only the file owner and root can modify the permissions.
HOWEVER - a file can be replaced by its copy and thus gain access to setting permissions on it

```shell
chmod 777 -R {folder}
```

**What is the sudo command?**

The root user is enabled to do anything on the system. This makes it very powerful to use everytime, so instead we use users with limited permissions. For a regular user to access the restricted permissions it must use "sudo" in front of the command. It will prompt for the user password afterwards.

To add more users to the sudo privileges you must use the "visudo" command to edit the sudo file. Also, to enable an user to use the sudo command, the user must be a member of the sudo group.

### How to set up users and groups

**What are users**

Linux is a multiuser operating system. There are human users - that log into the system - and system users - used for non-interactive actions. Linux treats them the same, only the ID range of them is different. Users can be in multiple groups at once. The information about users is stored in /etc/passwd file

Read about linux users on  [linuxacademy](https://linuxacademy.com/howtoguides/posts/show/topic/12659-understanding-linux-users-and-groups)

```shell
root@ubuntu:~$ head -1 /etc/passwd
root:x:0:0:root:/root:/bin/bash
```

get current user with "whoami"
change user with "su"

### Scripting

make script to run as anoher user
```shell
su - {username} <<-'EOF'
	{command 1}
	{command 2}
EOF
# the lines after the EOF will be executed again as the initial user
```

**Adding users**

If an user is created without setting a primary group, then a group with its name is created and assigned to it

```shell
adduser --home {home address} -c {comment} {user name}
```
or single command `useradd -d {home dir path} -p {encrypted} -m {username}`

Read resource about adding users [here](https://www.computerhope.com/unix/useradd.htm)

**Arguments to use:**

`c` Adds a comment. -c “John from Accounts”

`d` Specifies home directory for the user. Use this if the name of the home directory is different from the username. -d /home/accounts/john

`e` Specifies the expiration date for the account in YYYY-MM-DD format. -e 2017-01-01

`g` Specifies the primary group of the user. The group must already exist in the /etc/group file. -g accounts

`G` Specifies the additional groups to which the user belongs. -G employees

`k` Specifies the skeleton directory. The contents from the skeleton directory are copied into the user’s home directory. This flag can only be used in conjunction with the -m flag. The default skeleton directory is /etc/skel. -k /skelton/accounts

`p` Specifies the password to be associated with this account. This must be an encrypted password. You can assign the password later using passwd command. -p hashed_password

`s` Specifies the shell to be associated with this account. -s /bin/bash

`u` Specifies the user ID to be used with this account. Without -u flag, the first available user ID will be assigned. -u 1005


**Get info of user**
Read /etc/passwd and /etc/group
```shell
id {user}
```


**Modifying users**

Set password
```shell
sudo passwd {user}
```

Change the home directory (d flag) and copy the old content (m flag)
```shell
sudo usermod -m -d {new home dir} {user}
```

Change user's group

Change the main group
```shell
sudo usermod -g {new group} {user}
```

Add additional groups
```shell
sudo usermod -aG {group} {user}
```

Replace all additional groups
```shell
sudo usermod -G {group} {user}
```

Remove user from group
```shell
sudo deluser {user} {group}
```

**Delete user**
This not only deletes the user but also removes all the files that belong to the user including those that are outside the home directory.

to remove user and its files/home folder add -r flag
```shell
sudo userdel -r {user}
```

### Groups
Groups organize users permissions. When a file/folder is created it belongs by default to the user's primary group. Users that share the same group have the permissions set by the file/folder group permissions. 

create new group `groupadd {groupname}`

**How to change a folder owner and group**
```shell
chown {user}:{group} {target}
```
To use recursivly apply the `-R` flag

**How to see user's groups**
```shell
groups {user}
```

**Change primary group**
```shell
chgrp {newgroup}
```


### SSH

Read attlassian article about ssh keys - [attlassian link](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html#SetupanSSHkey-ssh2)

Generate ssh private/public keys:
```shell
ssh-keygen
```

**Configuring ssh settings**
SSH settings are found at /etc/ssh/sshd_config:
```shell
PasswordAuthentication no
```

Settings that override the global settings for matching IP addresses only
```shell
Match address 192.0.2.0/24
PasswordAuthentication yes
```

Tell the sshd service to reload its configuration:
```shell
service ssh reload
```

### Investigate Processes

To show processes and their owners use `ps -ef | grep nginx`

### Ufw (firewall)
```shell
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
```
### Investigate ports
Read all about ports (here)[https://www.journaldev.com/34113/opening-a-port-on-linux]

See all opened ports with `sudo netstat -tulpn`
Check for existing sockets with `ss -lntu`

### tmux
A terminal multiplexer (simulates multiple terminals inside one)

**Fix garbled screen**

- create .tmux.conf:
```shell
sudo tmux show -g | cat > /etc/.tmux.conf
```
- add this:
```shell
set -as terminal-overrides ',*:indn@'
```

### Access address or port (curl, wget)
```shell
curl {address}:{port}
```

### Filesystem

### Empty file without removing
```shell
truncate -s 0 filename
> file.txt
```


**symlinks**

Resources to read about it:

- [what is a symbolic link](https://www.cyberciti.biz/faq/creating-soft-link-or-symbolic-link/)
- [explaining soft/hard links](https://stackoverflow.com/a/185903/1957846)

Create soft link `ln -s file1 link1`

Verify the created symlink with `ls -l file1 link1`

**IMPORTANT**: provide full path to file and links not relative to cwd

### Mount/Unmount drives

```
fdisk -l
sudo mount /dev/sdb1 /media/usb-drive/
```

### System check

**Disk space**

Executing `df -h` will show space information in human readable format

**Available memory**

```shell
free -m
vmstat -s
htop
```

### Snaps
Snap is the new package management software with which Ubuntu wants to replace `apt`
Article about managing it is here: [ubuntu snaps](https://www.freecodecamp.org/news/managing-ubuntu-snaps/)

**List all snap services**

```shell
snap services
```

**Stop service**

```shell
sudo snap stop -disable {servicename}
```

### Searching through the filesystem

A good guide on how to use `find` command is [here](https://www.geeksforgeeks.org/find-command-in-linux-with-examples/) \
General search for a file. example `find {path} -name *.txt`

### Through a file
`grep {text} file`


### Handle machine state
Restart immediately using `sudo shutdown -r 0`

### Passing Commands
Passing input by stdin `ls | wc -l`
This will count the lines in the output of ls

Passing input by command line arguments `wc -l $(ls)`
This will count lines in the list of files printed by ls

### Managing Space
If you're using ubuntu snaps packages and docker chances are your packages and downloaded images/volumes will clutter up the disk space. Periodically is good to do a "spring cleaning" to avoid situations where you get prompted "you ran out of space!".

Follow these steps for the "spring cleaning":
1. Check available space
- we are using `df` and `du`
`df -h` 				- show a summary of all mounted filesystems
`du -h --max-depth=1 \` - show the calculated used space of the root directory 

2. Clear up the usual (temp files, trash, logs, old packages..)
Use the utility `bleachbit` to clean up unimportant files

3. Clear up Docker
`docker system df` 		- show a disk usage summary
`docker system prune`	- clear any unused containers, images or volumes (!make sure you run the containers you want to keep)

4. Clear up Snap
`snap remove {packagename}`

### Archiving/Zipping .tar .zip

`tar -xf archive.tar`

`tar -xf archive.tar -C /path/to/destination`

*securing a folder with password encryption*
We are not using zip because its encryption is not strong enough. Instead we are using (7zip)[https://7ziphelp.com/7zip-command-line]


Add
`7z a -p -mhe=on archiveName.7z /path/to/directory`

Extract
`7z x test.7z`


### Clear DNS cache

This is requied after updating `/etc/hosts` file: `sudo systemd-resolve --flush-caches`