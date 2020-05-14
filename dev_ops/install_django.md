# Installing Django and setting it up with nginx and gunicorn

Lead:
[Django](https://www.djangoproject.com/) is a high-level Python Web framework that facilitates rapid prototyping and building of complex applications. We'll discuss how to deploy in production using Gunicorn and Nginx on Ubuntu server. The primary deployment platform for Django is WSGI (web server gateway interface). Gunicorn is the application server that uses the WSGI object provided by Django to serve the application. We use Nginx to redirect the http requests to Gunicorn and serve the static files. We'll discuss here why we need all this setup even though Django comes with its own development server. We'll use python 3.

## Prerequisites:
1. Install python & pip
```
sudo apt-get update
sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx
```

2. Install virtualenv
```
sudo -H pip3 install --upgrade pip
sudo -H pip3 install virtualenv
```

3. Install Django
	* create virtual enviroment and install django in it
```
virtualenv myprojectenv
source myprojectenv/bin/activate
pip install django gunicorn psycopg2
```

4. Create Django project

* Start the project, handle static files & apply the migrations
```
django-admin startproject <projectname> <opt:path>
python manage.py collectstatic
python manage.py migrate
```

## Running Django development server
Django comes with a lightweight development server. [Docs for it is here](https://docs.djangoproject.com/en/2.0/ref/django-admin/#runserver). It uses the WSGI application object and it reloads python code for each request.
Start it from the root of the project (where manage.py is located):
```
python runserver <ip address>:<port>
```
Note 1: for it to be accessible from outsite use ip 0.0.0.0
Note 2: django server does not serve static files by default. [Use this guide](https://docs.djangoproject.com/en/2.0/howto/static-files/)

## What is Gunicorn and why/how we use it
Gunicorn is an application server that uses WSGI (web server gateway interface) to talk to Django. It sends the https requests to the python app (could be anything returning an http response) through WSGI and returns the http response. 

http request in > wsgi request to django

#### Simple testrun
The simplest example on running gunicorn:
```
  $ pip install gunicorn
  $ cat myapp.py
    def app(environ, start_response):
        data = b"Hello, World!\n"
        start_response("200 OK", [
            ("Content-Type", "text/plain"),
            ("Content-Length", str(len(data)))
        ])
        return iter([data])
  $ gunicorn -w 4 myapp:app
  [2014-09-10 10:22:28 +0000] [30869] [INFO] Listening at: http://127.0.0.1:8000 (30869)
  [2014-09-10 10:22:28 +0000] [30869] [INFO] Using worker: sync
  [2014-09-10 10:22:28 +0000] [30874] [INFO] Booting worker with pid: 30874
  [2014-09-10 10:22:28 +0000] [30875] [INFO] Booting worker with pid: 30875
  [2014-09-10 10:22:28 +0000] [30876] [INFO] Booting worker with pid: 30876
  [2014-09-10 10:22:28 +0000] [30877] [INFO] Booting worker with pid: 30877
```
The address http://127.0.0.1:8000 will show "Hello, World!"

#### Serve django wsgi
You can use gunicorn to serve django by using the django wsgi file
```
gunicorn <main app folder>.wsgi:application --bind 0.0.0.0:8000
```
Go to the address, port 8000 and you will see the app served. This way you can test if it works.
Keep in mind that Gunicorn will not serve static files.

## What is Nginx and why/how we use it
Nginx is a reverse proxy webserver. It redirects the http requests to the application server (gunicorn in this case) and serves its response or it just serves the static files. We use it for serving static files but also for added security, load balancing, all kind of goodies.
```
sudo apt-get install nginx
```

Create an html document *index.html* inside */home/ubuntu/myprojectfolder/html* and put a picture there that you used in *index.html*.

Build the configuration file <code>/etc/nginx/sites-available/*name_of_site*></code>
```
server {
    listen 80;
    server_name 127.0.0.1;

    location /data/ {
        root /home/ubuntu/myprojectfolder/data;
    }

    location / {
        root /home/ubuntu/myprojectfolder/html
    }
}
```
[nginx docs](https://nginx.org/en/docs/beginners_guide.html)

Make a symlink to the site-s config file to <code>/etc/nginx/sites-enabled/*name_of_site*</code> and restart the nginx server
```
sudo service nginx restart
```
Point your browser to *<server address>/index.html* and you'll see the served page.

> Note: 127.0.0.1 is accessible only locally
> Use 0.0.0.0 or the local ip (192.168.0.1 like) for the site to be accessed externally

## How we couple Gunicorn/Nginx
Gunicorn and Nginx communicate through an unix socket. Sockets are internal communication (for software on same hardware machine) ports that bypass the networking hardware to speed up communications. 

we'll set up gunicorn to start up as a service (running in background) and restart if it crashes
#### setting up through supervisord
create new file in */etc/supervisor/conf.d/gunicorn.conf*
```
[program:smileservices]
command=/home/smileservices/bin/gunicorn_start
user=smileservices
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/smileservices/logs/gunicorn-error.log
```
start the service
```
sudo supervisorctl start gunicorn
```
#### setting up through systemd
create new file in */etc/systemd/system/gunicorn.service*
```
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=sammy
Group=www-data
WorkingDirectory=<projec root>
ExecStart=<gunicorn file> --access-logfile - --workers 3 --bind unix:<socket location>/myproject.sock myproject.wsgi:application

[Install]
WantedBy=multi-user.target
```
start the service
```
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```

### Read more:
[SO response](https://serverfault.com/a/331263)
[Simple Is Better than Complex](https://simpleisbetterthancomplex.com/tutorial/2016/10/14/how-to-deploy-to-digital-ocean.html)
[DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-16-04)