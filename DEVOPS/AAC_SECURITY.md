Title: Securing Linux Web Servers
Category: Linux
Tags: linux, unix, security
Slug: securing-linux-web-server
Summary: What does it take to make a linux server secure? Close all the doors and put on good locks.
Date: 2018-11-03 10:20
Modified: 2021-04-05 19:30

### Intro
What does it take to make a linux server secure? Close all the doors and put on good locks.

### Workplan
We will go through all the steps for securing a new Ubuntu server on a virtual machine:

1. Change ssh port
2. Disable password login allow only auth key
3. Enable firewall

### Resources about server security

1. [digitalocean article](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

### Securing ssh access

SSH settings are found at /etc/ssh/sshd_config:
Restart ssh daemon

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

### Blocking SPAM requests with fail2ban

Fail2ban scans log files (e.g. /var/log/apache/error_log) and bans IPs that show the malicious signs -- too many password failures, seeking for exploits, etc. Generally Fail2Ban is then used to update firewall rules to reject the IP addresses for a specified amount of time, although any arbitrary other action (e.g. sending an email) could also be configured. Out of the box Fail2Ban comes with filters for various services (apache, courier, ssh, etc).
Fail2Ban is able to reduce the rate of incorrect authentications attempts however it cannot eliminate the risk that weak authentication presents. Configure services to use only two factor or public/private authentication mechanisms if you really want to protect services.

**Read list:**

- https://www.fail2ban.org/wiki/index.php/Main_Page
- https://www.booleanworld.com/blocking-bad-bots-fail2ban/
- https://bobcares.com/blog/fail2ban-apache-404/

**Concepts**

- filters: used to comb through the log files and get select which requests to ban
- jails: main point to configure what filter to use on which log files

**Step1 : install**
```bash
sudo apt-get update
sudo apt-get install fail2ban
```

**Step2 : create jail file**

1. create /etc/fail2ban/jail.local
2. Restart `systemctl restart fail2ban`

```bash
[nginx-botsearch]

enabled   = true
port      = http,https
filter    = nginx-botsearch
logpath   = /var/www/logs/nginx-access.log
maxretry  = 3
banaction = iptables-multiport
findtime  = 360
bantime   = 360
```

**Checking filters**

Use to check how many entries the selected filter will ban
`fail2ban-regex {log path} {filter path}`

**Checking jail status**

`fail2ban-client status {jail name}`


### Making sure Docker and `ufw` work well together

Docker changes your iptables on its own, which doesn't play well with ufw status. 
Possible solutions:

1. Stop using the -p flag. Use docker linking or docker networks instead.
2. Bind containers locally so they are not exposed outside your machine: 
`docker run -p 127.0.0.1:8080:8080 ...`