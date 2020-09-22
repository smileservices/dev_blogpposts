Title: Securing Linux Web Servers
Category: Linux
Tags: linux, unix, security
Slug: securing-linux-web-server
Summary: What does it take to make a linux server secure? Close all the doors and put on good locks.
Date: 2018-11-03 10:20
Modified: 2020-07-05 19:30

## Workplan:
1. Change ssh port
2. Disable password login allow only auth key
3. Enable firewall

Read about common security rules on [digitalocean article](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

SSH settings are found at /etc/ssh/sshd_config:
restart ssh daemon
```shell
PasswordAuthentication no
Port {newport}
```
Restart ssh service
```shell
sudo systemctl restart sshd
```

Enable firewall
```shell
sudo ufw enable
sudo ufw allow {ssh_port}
sudo ufw allow 80
```