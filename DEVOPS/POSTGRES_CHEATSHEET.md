# CHEATSHEET:
https://tomcam.github.io/postgres

## Most Useful

- go into postgres user
```
su - postgres
```


## PostgreSQL

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04
https://bosnadev.com/2015/12/15/allow-remote-connections-postgresql-database-server/

ubuild_db_t
ubuild_t
fuckthesepasswords

## to create user and db
sudo su - postgress
createuser u_urban
createdb urban_prod --owner u_urban
psql -c "ALTER USER u_urban WITH PASSWORD '123'"

CREATE USER u_urban WITH PASSWORD '2342#344a!sdas';
ALTER ROLE ubuild_t SET client_encoding TO 'utf8';
ALTER ROLE ubuild_t SET default_transaction_isolation TO 'read committed';
ALTER ROLE ubuild_t SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ubuild_db_t TO ubuild_t;

## delete db
`dropdb {dbname}` delete the database

## how to connect remotely to postgresql db on server with pycharm
1. make postgresql accept remote connections
 - open /etc/postgresql/{version no}/main/postgresql.conf
 - edit listen_addresses = '*'  
 - open /etc/postgresql/{version no}/main/pg_hba.conf
 - allow connections from anywhere: host all all 0.0.0.0/0 md5
 restart
 /etc/init.d/postgresql restart
 - add rule in ufw (ufw allow 5432)


 https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e


## USEFUL COMMANDS
https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

1. First, open psql:
'''
sudo su - postgres
psql
'''

Show all databases: \l
Show all users: \du
Quit: \q


ALTER USER <username> WITH PASSWORD '<new_password>';  -- change password
ALTER USER <old_username> RENAME TO <new_username>;    -- rename user

CREATE USER <username> PASSWORD '<password>' IN GROUP <group>;
DROP USER <username>;

ALTER GROUP <old_group> DROP USER <username>;
ALTER GROUP <new_group> ADD USER <username>;

2. Connect to DB:
```bash
su - postgres
psql
\c {db_name}
```

3. Enable Extensions:

Run commands in the specific database using a super admin or root user:

```bash
su - postgres
psql
\c {db_name}
```
```sql
CREATE EXTENSION IF NOT EXISTS "";
```

## Enable Full Text Search

This results in the following SQL:
!note: run this connected to the specific database
```sql
BEGIN;
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
COMMIT;
```
need to run this command as db super admin or have create privileges

## Debug

- start
systemctl start postgresql@10-main

- status
systemctl status postgresql@10-main.service

- log
/var/log/postgresql/postgresql-10-main.log

## Troubleshooting

- make sure db is up and running

```
service postgresql status
```

- show config file
```
psql -U postgres -c 'SHOW config_file'
```

## Login

```
psql -h localhost -U {user}
```


# PSQL commands:

`\q` to quit
`\d` display all tables in a database
`psql -f {sql file}` runs sql file

# Apply sql dump
`psql {dbname} < dump.sql` or `psql -U {user} {dbname} < dump.sql`

https://kb.objectrocket.com/postgresql/how-to-run-an-sql-file-in-postgres-846