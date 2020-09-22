# Protecting nginx vhost with password

https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04

1. Make .htpasswd file with username/password
```
sudo sh -c "echo -n '{username}:' >> /etc/nginx/.htpasswd"
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
```

2. Configure nginx config block
```
	server {

	    location / {
	        try_files $uri $uri/ =404;
	        auth_basic "Restricted Content";
	        auth_basic_user_file /etc/nginx/.htpasswd;
	    }
	}
```

3. Restart server
```
sudo service nginx restart
```