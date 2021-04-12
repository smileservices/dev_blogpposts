# managing services with systemd cheatsheat

## get running services

1. systemctl is provided by systemd

to checkstatus, and stop/start/restart:
```
sudo systemctl {status/stop/start/restart} {service name}
```
to enable or disable at startup
```
sudo systemctl {enable/disable} {service name}
```

2. or use the service wrapper command. service works with system v and init.d

```
sudo service --status-all
```

```
sudo service {service name} {status/stop/start/restart}
```

## making and starting a service
https://tecadmin.net/setup-autorun-python-script-using-systemd/

1. create unit config file in /etc/systemd/system/{name}
```
[Unit]
Description=noodles huey consumer

[Service]
User=noodles
Group=noodles
WorkingDirectory=/home/noodles/noodles
ExecStart=/home/noodles/huey_start
Restart=always
RestartSec=0

[Install]
WantedBy=multi-user.target
```
2. reload systemd `systemctl daemon-reload`
3. enable `systemctl enable {name}`


