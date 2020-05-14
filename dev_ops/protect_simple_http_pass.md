# Use nginx 

sudo apt-get install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd nginx

can check users: cat /etc/nginx/.htpasswd

open the nginx sites-available conf file
add auth_basic and auth_basic_user_file directives to location

## example
location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
    # Uncomment to enable naxsi on this location
    # include /etc/nginx/naxsi.rules
    auth_basic "Private Property";
    auth_basic_user_file /etc/nginx/.htpasswd;
}