# Run postgres and pgadmin in docker

docker-compose.yaml
```
version: "3.7"
services:
  postgresdb:
    image: postgres:latest
    ports:
      - "5432:5432"
    container_name: postgresdb
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - "/var/run/postgres.sock:/var/run/postgres/postgres.sock"
      - "/home/vldmr/docker-apps/volumes/postgres-data:/var/lib/postgresql/data"
    networks: 
      - postgres
  pg_admin:
    image: dpage/pgadmin4:latest
    container_name: pg_admin
    ports:
      - "5050:80"
    environment:
      - GUNICORN_THREADS=1
      - PGADMIN_DEFAULT_EMAIL=vladimir.gorea@gmail.com
      - PGADMIN_DEFAULT_PASSWORD=12345
    depends_on:
      - postgresdb
    networks: 
      - postgres
networks: 
  postgres:
    name: postgresdb_network
    driver: bridge
```

Run 'docker-compose up' 