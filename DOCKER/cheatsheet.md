# Docker Cheatsheet
https://docker-curriculum.com/

## start docker
```
sudo snap start docker
```

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