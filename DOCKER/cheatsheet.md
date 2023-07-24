# Docker Cheatsheet
https://docker-curriculum.com/

# Setting up

Change default storage space: https://evodify.com/change-docker-storage-location/

## start docker
```
sudo snap start docker
```

## run image into container with bash
`docker run --rm -it --entrypoint bash <image name>`

## stop/rm all docker containers
`docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)`

## 1remove all networks:
`docker network rm $(docker network ls -q)`

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

- to run on the same host network, add `network_mode: host` to the specific service. the serivce using this cannot map ports.

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

## Networking

Docker containers communicating to eachother: 
1. inside the docker-compose - use their assigned service name or IP (inspect docker network and check out the ip of all the containers)
2. outside the docker-compose - expose ports like '5432:5432' access it like localhost:5432

https://maximorlov.com/4-reasons-why-your-docker-containers-cant-talk-to-each-other/

# Working with Repositories

Can push/pull images to/from custom repositories.

You need to tag your image correctly first with your registryhost:
`docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]`

Then docker push using that same tag. `docker push NAME[:TAG]`

```bash
docker tag 518a41981a6a myRegistry.com/myImage
docker push myRegistry.com/myImage
```

infra@aliz.ai
