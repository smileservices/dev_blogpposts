Title: Deploying Django App
Category: Django
Tags: linux, django, unix, deployment, ssl, certbot, postgresql, nginx
Slug: deploying-django
Summary: How to set up a Django app deployment on an Ubuntu server: initial configuration of the server and then setting up the app
Date: 2018-06-03 10:20
Modified: 2020-07-05 19:30

### Intro
How to set up a Django app deployment on an Ubuntu server: initial configuration of the server and then setting up the app.

### Workplan

Deploying Django app is not an easy task. Need to take care of setting up the server, proxyserver, SSL certificate, database connections.

1. Install nginx, python, virtualenv, certbot, postgresql etc
2. Create user named as app
3. Clone the app repo in the home folder of the user
4. Make virtualenv
5. Run the scripts for the app - install requirements, collectstatic, etc
6. Create gunicorn_start file in the user dir
7. Create nginx config file
8. Add gunicorn service to systemd or supervisor

### Initial setup

Create user with sudo rights

```shell
adduser {name}
paswd {name}
usermod -aG sudo {name}
su {name}
```
Once we have the user set up, there are still a few steps to take care of:

- Add publickey and set up ssh connection
- Remove password and root login
- Create user for each app

### Install python,django,virtualenv,nginx,gunicorn

```shell
sudo apt-get update
sudo apt-get -y upgrade
sudo apt install certbot
sudo apt install python-certbot-nginx
sudo apt-get -y install build-essential libpq-dev python-dev
sudo apt-get -y install postgresql postgresql-contrib
sudo apt-get -y install nginx
sudo apt-get -y install supervisor
sudo systemctl enable supervisor
sudo systemctl start supervisor
sudo apt-get -y install python3-virtualenv
sudo apt-get -y install python3-pip
```

Some projects might require install an optional memory key-value database for caching like Redis

### Set up django project

Create new user for each app

- Create linux user for app `adduser {username}`
- Create [virtual env](https://docs.python.org/3/library/venv.html) in `~/www/{project_name}`

```shell
python3 -m venv {project_name}
```
- Activate the venv 
```shell
source ~/www/{project_name}
```
- Alone repo in ~/www/{project_name}/repo
- Install requirements
```shell
pip install -r repo/requirements.txt
```

- Create .env file (if project requires it)
- Collectstatic and create superuser

```shell
python manage.py collectstatic
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Set up PostgreSQL
```shell
sudo apt-get -y install build-essential libpq-dev python-dev
sudo apt-get -y install postgresql postgresql-contrib
su - postgres
createuser {db_username}
createdb {db_name} --owner {db_username}
psql -c "ALTER USER {db_username} WITH PASSWORD '{password}'"
```


### Set up Gunicorn (acting as proxyserver)
Create gunicorn_start file in {app root}/bin/

```shell
# gunicorn_start file
#!/bin/bash

NAME="memeashirt.smile-services.ro"
DIR=/home/smileservices/www/memeashirt/repo
USER=smileservices
GROUP=smileservices
WORKERS=3
BIND=unix:/home/smileservices/www/memeashirt/run/gunicorn.sock
DJANGO_SETTINGS_MODULE=tshirtstore.settings
DJANGO_WSGI_MODULE=main.wsgi
LOG_LEVEL=error

cd $DIR
source ../bin/activate

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DIR:$PYTHONPATH

exec ../bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $WORKERS \
  --user=$USER \
  --group=$GROUP \
  --bind=$BIND \
  --log-level=$LOG_LEVEL \
  --log-file=-
```

Make it executable

```shell
chmod u+x bin/gunicorn_start
```
- Create empty directory 'run' where gunicorn.sock will be created
- Create directory 'logs' with empty file gunicorn-error.log

**Add gunicorn to supervisor or systemd**

This step is required for making sure django app is run even if it stops
- Set up supervisor /etc/supervisor/conf.d/{name}.conf

```shell
[program:{name}]
command=/home/{user}/www/{dir}/bin/gunicorn_start
user={user}
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/{user}/www/memeashirt/logs/gunicorn-error.log
```

- Add the new task to supervisor

```shell
sudo supervisorctl reread
sudo supervisorctl update
```

### Set up nginx
Create vhost file in /etc/nginx/sites-available/{name}

```shell
upstream app_memeashirt_test {                                                                    
    server unix:/home/smileservices/www/memeashirt.smile-services.ro/run/gunicorn.sock fail_timeout=0;
}                                                                                                 
                                                                                                  
server {                                                                                          
                                                                                                  
    # add here the ip address of your server                                                      
    # or a domain pointing to that ip (like example.com or www.example.com)                       
    server_name memeashirt.smile-services.ro;                                                     
                                                                                                  
    keepalive_timeout 5;                                                                          
    client_max_body_size 4G;                                                                      
                                                                                                  
    access_log /home/smileservices/www/memeashirt/logs/nginx-access.log;                          
    error_log /home/smileservices/www/memeashirt/logs/nginx-error.log;                            
                                                                                                  
    location /static/ {                                                                           
        alias /home/smileservices/www/memeashirt/repo/static_col/;                                
    }                                                                                             
                                                                                                  
    # checks for static file, if not found proxy to app                                           
    location / {                                                                                  
        try_files $uri @proxy_to_app;                                                             
    }                                                                                             
                                                                                                  
    location @proxy_to_app {                                                                      
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;                                
      proxy_set_header Host $http_host;                                                           
      proxy_redirect off;                                                                         
      proxy_pass http://app_memeashirt_test;                                                      
      auth_basic "Restricted Access";                                                             
      auth_basic_user_file /etc/nginx/memeashirt.htpasswd;                                        
    }                                                                                             
}                                                                                                 
```

Make a soft symlink to enable the virtual block 
```shell
ln -s /etc/ngnix/sites-available/{name} /etc/nginx/sites-enabled/{name}
```

Check the nginx configuration and restart it
```shell
sudo nginx -t
sudo service nginx restart
```

### Set up ssl
We'll create the SSL certificate ourselves, for free, using `certbot`

```shell
sudo certbot --nginx -d {domain name} 
```
