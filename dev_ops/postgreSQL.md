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
sudo su - postres
psql
'''

Show all databases: \l
Show all users: \du


ALTER USER <username> WITH PASSWORD '<new_password>';  -- change password
ALTER USER <old_username> RENAME TO <new_username>;    -- rename user

CREATE USER <username> PASSWORD '<password>' IN GROUP <group>;
DROP USER <username>;

ALTER GROUP <old_group> DROP USER <username>;
ALTER GROUP <new_group> ADD USER <username>;


# Debug

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

- try connect with user

```
psql -h localhost -U {user}
```