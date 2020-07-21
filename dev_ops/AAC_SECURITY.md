# Keeping server secure

- change ssh port
- disable password login allow only auth key

edit ssh port here /etc/ssh/sshd_config
restart ssh daemon
```
sudo systemctl restart sshd
```
- enable firewall
https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands
```
sudo ufw enable
sudo ufw allow {ssh_port}
sudo ufw allow 80
```