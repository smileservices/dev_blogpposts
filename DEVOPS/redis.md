# Redis

## Install
```bash
sudo apt update
sudo apt install redis-server
```

```bash
sudo nano /etc/redis/redis.conf
. . .

# If you run Redis from upstart or systemd, Redis can interact with your
# supervision tree. Options:
#   supervised no      - no supervision interaction
#   supervised upstart - signal upstart by putting Redis into SIGSTOP mode
#   supervised systemd - signal systemd by writing READY=1 to $NOTIFY_SOCKET
#   supervised auto    - detect upstart or systemd method based on
#                        UPSTART_JOB or NOTIFY_SOCKET environment variables
# Note: these supervision methods only signal "process is ready."
#       They do not enable continuous liveness pings back to your supervisor.
supervised systemd

. . .
sudo systemctl restart redis.service
sudo systemctl status redis
```

## Issuing commands
```bash
redis-cli
```
`FLUSHALL`  - flush all
`KEYS *`    - show all keys

`type {key}` - get type of key

and depending on the response perform:

for "string": get <key>
for "hash": hgetall <key>
for "list": lrange <key> 0 -1
for "set": smembers <key>
for "zset": zrange <key> 0 -1 withscores