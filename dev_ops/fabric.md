# Fabric
https://www.fabfile.org/

## Use ssh keys
```
from fabric import Connection

c = Connection(
		host='127.0.0.1',
		user='vm',
		port=2222,
		connect_kwargs={
			'key_filename': '/home/vladimir/.ssh/id_rsa'
		}
	)

c.run('systemctl status nginx')
```

## Issues
1. Doesn't work with running commands while connected using ssh key
2. Have to use workarounds if you want to change user while already connected
3. A little convoluted for doing basic stuff on server