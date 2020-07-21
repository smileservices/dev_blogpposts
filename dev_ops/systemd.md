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





