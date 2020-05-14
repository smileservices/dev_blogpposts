# Set up gunicorn

A Python WSGI HTTP Server for UNIX
* install gunicorn locally - in the virtualenv

* run gunicorn
```
gunicorn mySite.wsgi:application --bind 0.0.0.0:8000
```

````
$ cat myapp.py
def app(environ, start_response):
    data = b"Hello, World!\n"
    start_response("200 OK", [
        ("Content-Type", "text/plain"),
        ("Content-Length", str(len(data)))
    ])
    return iter([data])

$ gunicorn -w 4 myapp:app
```	

> Note: When an application is set to listen for incoming connections on 127.0.0.1, it will only be possible to access it locally. If you use 0.0.0.0, however, it will accept connections from the outside as well.

Good article about django,gunicorn,nginx on [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)
