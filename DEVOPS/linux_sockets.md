## GUNICORN LINUX SOCKETS

problem: gunicorn can't connect to sock

A UNIX socket is like a TCP connection, except it's represented as a file. gunicorn is supposed to create it on startup and destroy it on shutdown, and it shouldn't be present when gunicorn is not running.

gunicorn creates socket when ran with sudo