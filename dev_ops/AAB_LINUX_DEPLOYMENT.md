# Workplan
systemwide
1. install nginx, python, virtualenv, certbot, postgresql etc
2. make user named as app and clone the app repo in the home folder of the user. make virtualenv
3. run the scripts for the app - install requirements, collectstatic, etc
4. make gunicorn_start file in the user dir
5. make nginx config file
6. add gunicorn service to systemd or supervisor

# Initial setup
- create user with sudo rights
```
adduser {name}
paswd {name}
usermod -aG sudo {name}
su {name}
```
- add publickey and set up ssh connection
- remove password and root login
- create user for each app

# Install python,django,virtualenv,nginx,gunicorn
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

! Install optional Redis, Elasticsearch (if using haystack, install elasticsearch 1.75)

# Set up django project
- create new user for each app
adduser {user}
- create (virtual env)[https://docs.python.org/3/library/venv.html] in ~/www/{project_name}
```
python3 -m venv {project_name}
```
- activate the venv 
```
source ~/www/{project_name}
```
- clone repo in ~/www/{project_name}/repo
- install requirements
```
pip install -r repo/requirements.txt

```
- create .env file (if project requires it)
- collectstatic and create superuser

```
python manage.py collectstatic
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

# Set up postgresql
sudo apt-get -y install build-essential libpq-dev python-dev
sudo apt-get -y install postgresql postgresql-contrib
su - postgres
createuser {db_username}
createdb {db_name} --owner {db_username}
psql -c "ALTER USER {db_username} WITH PASSWORD '{password}'"

# Set up nginx and gunicorn

## set up gunicorn

- create gunicorn_start file in {app root}/bin/

```
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

- Make it executable

```
chmod u+x bin/gunicorn_start
```

- create empty directory 'run' where gunicorn.sock will be created
- create directory 'logs' with empty file gunicorn-error.log



### add gunicorn to supervisor
- set up supervisor /etc/supervisor/conf.d/{name}.conf

```
[program:{name}]
command=/home/{user}/www/{dir}/bin/gunicorn_start
user={user}
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/{user}/www/memeashirt/logs/gunicorn-error.log
```

- add the new task to supervisor

```
sudo supervisorctl reread
sudo supervisorctl update
```

## set up nginx
- create vhost file in /etc/nginx/sites-available/{name}

```
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
```
ln -s /etc/ngnix/sites-available/{name} /etc/nginx/sites-enabled/{name}
```

Check the nginx configuration and restart it
```
sudo nginx -t
sudo service nginx restart
```

# Set up ssl
```
sudo certbot --nginx -d {domain name} 
```
