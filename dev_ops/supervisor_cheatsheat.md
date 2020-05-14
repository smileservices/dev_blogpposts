
# Setup

sudo apt-get -y install supervisor

sudo systemctl enable supervisor
sudo systemctl start supervisor

# Usage

put .conf files in /etc/supervisor/conf.d/

## example /etc/supervisor/conf.d/ubuild.smile-services.ro.conf
[program:ubuild.smile-services.ro]
command=/home/smileservices/www/ubuild.smile-services.ro/bin/gunicorn_start
user=smileservices
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/smileservices/www/ubuild.smile-services.ro/logs/gunicorn-error.log

sudo supervisorctl reread
sudo supervisorctl update

sudo supervisorctl restart {program}
sudo supervisorctl status {program}

