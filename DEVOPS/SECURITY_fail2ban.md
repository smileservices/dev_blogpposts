# Blocking SPAM requests with fail2ban
https://www.fail2ban.org/wiki/index.php/Main_Page

https://www.booleanworld.com/blocking-bad-bots-fail2ban/
https://bobcares.com/blog/fail2ban-apache-404/


Fail2ban scans log files (e.g. /var/log/apache/error_log) and bans IPs that show the malicious signs -- too many password failures, seeking for exploits, etc. Generally Fail2Ban is then used to update firewall rules to reject the IP addresses for a specified amount of time, although any arbitrary other action (e.g. sending an email) could also be configured. Out of the box Fail2Ban comes with filters for various services (apache, courier, ssh, etc).

Fail2Ban is able to reduce the rate of incorrect authentications attempts however it cannot eliminate the risk that weak authentication presents. Configure services to use only two factor or public/private authentication mechanisms if you really want to protect services.

## Concepts
- filters: used to comb through the log files and get select which requests to ban
- jails: main point to configure what filter to use on which log files

## Step1 : install
```bash
sudo apt-get update
sudo apt-get install fail2ban
```

## Step2 : create jail file
1. create /etc/fail2ban/jail.local

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
2. Restart `systemctl restart fail2ban`

## Checking filters
Use to check how many entries the selected filter will ban
`fail2ban-regex {log path} {filter path}`

## Checking jail status
`fail2ban-client status {jail name}`
