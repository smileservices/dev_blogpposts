# Debugging problems in serving the application
# ubuntu, nginx, gunicorn, django

## Files to look at

0. logs
1. /etc/nginx/sites-available/{app name}
2. /etc/nginx/sites-enabled/{app name}

## useful commands:

sudo netstat -tulpn
shows all listening ports

## nginx not starting

1. test the configuration files
'''
sudo nginx -t
'''
2. look into the log files /var/log/nginx/error.log
	1. bind() to 0.0.0.0:80 failed (98: Address already in use)
	Then it means nginx or some other process is already using port 80.
	Solutions:
	1. kill the process currently attached to port 80
	'''
	sudo kill -{id}
	'''
	2. Config problem?
	https://chrisjean.com/fix-nginx-emerg-bind-to-80-failed-98-address-already-in-use/
	


## 404
1. check gunicorn is working
- file: {project_root}/bin/gunicorn_start
- set LOG_LEVEL to debug
- manually run 
```
sudo bin/gunicorn_start
```
2. check if nginx sites-enabled symlink is pointing correctly
- symlinks in sites-enabled should point to the absolute url:
/etc/nginx/sites-available/site.com not sites-available/site.com

##502
Could not find platform independent libraries <prefix>
Could not find platform dependent libraries <exec_prefix>
Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
Fatal Python error: Py_Initialize: Unable to get the locale encoding
ImportError: No module named 'encodings'

