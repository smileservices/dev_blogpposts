# Docker Cheatsheet
https://docker-curriculum.com/

## start docker
```
sudo snap start docker
```

## stop/rm all docker containers
`docker stop $(docker ps -a -q)`
`docker rm $(docker ps -a -q)`

## remove all containers filtered with grep
`docker rm $(docker ps -a|grep ziti|awk '{print $1}')`

## images, containers
- show all containers, images
```
docker ps -a
docker images
```

- build image from Dockerfile
```
docker build -t {image name} {path to Dockerfile}
```

- run command for container
```bash
docker exec -it {container name} {command}
```

## network
- list all docker networks, inspect one
```
docker network ls
docker network inspect {network name}
```

## running
- detached (in background): add `-d` flag

### See running containers stats

See all running docker containers resources
`docker ps -q | xargs  docker stats --no-stream` or just `docker stats`

### Limiting Docker Containers
https://phoenixnap.com/kb/docker-memory-and-cpu-limit


## TROUBLESHOOTING:

!!Cannot connect to service (postgresql):

Sometimes the services are available at address 172.21.0.2 rather than localhost or 127.0.0.1