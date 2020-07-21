# Docker Cheatsheet
https://docker-curriculum.com/

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


## network
- list all docker networks, inspect one
```
docker network ls
docker network inspect {network name}
```
