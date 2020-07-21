# PostgreSQL with docker-container
--------------------------------

https://github.com/zhao-lin-li/postgresql-with-docker-compose
https://medium.com/analytics-vidhya/getting-started-with-postgresql-using-docker-compose-34d6b808c47c

# YML file
	'''
	version: '3'
	services:
	  database:
	    image: "postgres" # use latest official postgres version
	    env_file:
	      - postgresql.env # configure postgres
	    volumes:
	      - database-data:/var/lib/postgresql/data/ # persist data even if container shuts down
	volumes:
	  database-data: # named volumes can be managed easier using docker-compose
	'''

# .env file
	'''
	POSTGRES_USER=admin
	POSTGRES_PASSWORD=password
	POSTGRES_DB=integrator_db
	'''
