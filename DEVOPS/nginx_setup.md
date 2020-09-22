# nginx setup

> an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server

in detail article from [Digitalocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04)

Minimal set up:

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/site/html;
    index index.html index.htm index.nginx-debian.html;

    server_name site.com www.site.com;

    location / {
            try_files $uri $uri/ =404;
    }
}
```

* default_server tag can be used only once in all server blocks to declare the default block to be loaded if the servername does not corresponds to any of the other names.
* root is setting the root directory of the site
* server_name match the request name

Test configuration and restart nginx
```
nginx -t
sudo service nginx restart
```

https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms
