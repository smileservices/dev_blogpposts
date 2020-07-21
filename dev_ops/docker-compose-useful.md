# Useful docker-compose stuff

## how to bind physical folder to docker volume
	
volumes:	


Volumes explained:
https://www.youtube.com/watch?v=p2PH_YPCsis
https://www.youtube.com/watch?v=SBUCYJgg4Mk

https://docs.docker.com/compose/compose-file/#long-syntax-3
Using the host : guest format you can do any of the following:


  # Just specify a path and let the Engine create a volume
  /var/lib/mysql

  # Specify an absolute path mapping
  /opt/data:/var/lib/mysql

  # Path on the host, relative to the Compose file
  ./cache:/tmp/cache

  # User-relative path
  ~/configs:/etc/configs/:ro  

  # Named volume
  datavolume:/var/lib/mysql


'''

	version: 3
	services:
		mongo-db:
			image: mongo
			ports: 
				- 27010:27010
			volumes:
				- name-of-volume:/path/inside/container
	volumes:
		name-of-volume:
			driver: local
			driver_opts:
				- type: none
				- o: bind
				- device: c:/path/inside/host

