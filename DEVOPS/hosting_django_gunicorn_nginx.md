https://simpleisbetterthancomplex.com/tutorial/2016/10/14/how-to-deploy-to-digital-ocean.html

# Hosting & serving Django apps with Ubuntu server 16.04, gunicorn, nginx, freessl

Hosting and deploying Django applications is more complicated than with PHP because there are many ways to do this, but this guide hopefully will clear up the fog and give you a simple solution. On this we'll deal with serving multiple apps on the same server.

The architecture of the setup is this:
Nginx serves static files and routes the application requests to Gunicorn which is the application server for our Django application.


## Initial set-up & directory structure
As any other initial setup on linux, we upgrade the packages
```
sudo apt-get update
sudo apt-get -y upgrade
```
We need to install virtualenv as each application will have its own python enviroment:
```
sudo apt-get install virtualenv
```

Supervisor is useful for managing the gunicorn instances. 

```
sudo apt-get -y install supervisor
sudo systemctl enable supervisor
sudo systemctl start supervisor
```

We need to create a user for each application in order to minimize the security risks. If a website is breached, this will contain the problem to the specific app. It's important that you understand the unix users/groups and file permissions.

We go to where we want the apps to stay, in this case /usr/www, and set up the python virtualenviroment:

```
cd /usr/www
virtualenv {application name}
```
This will create a folder for our application. Set its owner/group to the one you created for it `chown {username}:{groupname}`. You can set the python version for the enviroment by adding the -p flag: 
```
virtualenv -p python3.5 {application name}
```
Next, create three more empty folders `mkdir logs && mkidr run && mkdir www`

The folder structure for the applications will be this:

```
/usr/www/
-- application1
---- (folders created by virtualenv)
---- logs
---- run (for the gunicorn socket)
---- www (where the django project files will reside)
-- application2
---- (folders created by virtualenv)
---- logs
---- run (for the gunicorn socket)
---- www (where the django project files will reside)
....
```

## Setting up Django project
Activate the virtualenv from the app folder:
```
source bin/activate
```
Clone the django app repo to the www folder, install dependencies, do the migrations, collectstatic, create super user (if you have admin backend activated)
```
git clone {app repo} www
cd www
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
python manage.py createsuperuser
```

## Setting up gunicorn
While you have the virtualenviroment activated, install gunicorn `pip install gunicorn`. We'll have a single gunicorn instance for every application.

### gunicorn_start file
Create the file bin/gunicorn_start that will start gunicorn serving the django app. Its content should be this:

{main app} is the name of the folder holding the settings.py file.

```
#!/bin/bash

NAME="{name of app}"
DIR=/usr/www/{app folder}/www
USER={linux user}
GROUP={linux group}
WORKERS=3
BIND=unix:/usr/www/{app folder}/run/gunicorn.sock
DJANGO_SETTINGS_MODULE={main app}.settings
DJANGO_WSGI_MODULE={main app}.wsgi
LOG_LEVEL=error

cd $DIR
source ../bin/activate

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DIR:$PYTHONPATH

exec gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $WORKERS \
  --user=$USER \
  --group=$GROUP \
  --bind=$BIND \
  --log-level=$LOG_LEVEL \
  --log-file=-
 ```	

 Make it executable : `chmod u+x bin/gunicorn_start` and create the empty directory where gunicorn.sock will be created

### Add service automation through supervisor

We'll now set up automated restart of the gunicorn instance in the case it stops working (crash or restart). We'll use supervisord, the service we've installed at the initial setup.

Create empty log files:
```
touch logs/gunicorn-error.log
touch logs/nginx-error.log
touch logs/nginx-access.log
```

Create new supervisor file for the app's gunicorn instance:
```
sudo vim /etc/supervisor/conf.d/urban-train.conf
```
This will contain
```
[program:{name of the process}]
command=/usr/www/{app folder}/bin/gunicorn_start
user={linux user}
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/usr/www/{app folder}/logs/gunicorn-error.log
```
Update the supervisor with the new config
```
sudo supervisorctl reread
sudo supervisorctl update
```

To get the status of the new process do `sudo supervisorctl status {name of the process}`

To restart the gunicorn instance (required if you do a git pull on the app) do `sudo supervisorctl restart {name of the process}` 

## Setting up nginx
Nginx manages user's requests and serves the static files and routes the non static files through the gunicorn socket. We will set up a virtual server configuration block in the /etc/nginx/sites-available folder:

```
upstream app_server_artstore {
    server unix:/usr/www/{folder name}/run/gunicorn.sock fail_timeout=0;
}

server {
    listen 80;
    # add here the ip address of your server
    # or a domain pointing to that ip (like example.com or www.example.com)
    server_name {url or ip};

    keepalive_timeout 5;
    client_max_body_size 4G;

    rewrite_log on;
    access_log /usr/www/{folder name}/logs/nginx-access.log;
    error_log /usr/www/{folder name}/logs/nginx-error.log;

	# for serving static files
    location /static/ {
        alias /usr/www/{folder name}/www/static_col/;
    }

    # checks for static file, if not found proxy to app
    location / {
        try_files $uri @proxy_to_app;
    }

    location @proxy_to_app {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_redirect off;
      proxy_pass http://app_server_artstore;
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

Check out in the browser by typing in the address. It should work.

## Set up free ssl

Let's Encrypt is a Certificate Authority (CA) that provides an easy way to obtain and install free TLS/SSL certificates, thereby enabling encrypted HTTPS on web servers. It simplifies the process by providing a software client, Certbot, that attempts to automate most (if not all) of the required steps. Currently, the entire process of obtaining and installing a certificate is fully automated on both Apache and Nginx.

### Install Certbot 
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx

```
### Set up the firewall
```
sudo ufw status
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
```

Check to see if the firewall is set up correctly `sudo ufw status`

### Obtain the certificate
```
sudo certbot --nginx -d {domain name} 
```
If that's successful, certbot will ask how you'd like to configure your HTTPS settings.

## Maintenance

### Deploying changes
```
git pull
```
do a collectstatic on manage.py
```
python3 manage.py collectstatic
```
```
sudo supervisorctl #to list and enter into supervisor mode
restart {processname}
sudo service nginx restart
```