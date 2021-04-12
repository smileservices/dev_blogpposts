# Using Postgresql with extensions and Django
Django cannot apply migrations if they require a psqls extension that is not available on the db.
While on the normal db this is easily done by activating the extensions manually,
for testing it's a major source of pain because the db is setup automatically at start

## Problem:
django migrations and postgresql extensions don't work well together

## Solution:
use postgresql template for databases

```bash
$ psql -U postgres -d template1 -c "CREATE EXTENSION {extension_name};"
```
This will alter the template1, which all newly created db use



SO problem: https://stackoverflow.com/questions/16527806/cannot-create-extension-without-superuser-role
==========
You can also install postgis to the template1 database template which is inherited by default by all newly created database.

$ psql -U postgres -d template1 -c "CREATE EXTENSION postgis;"
All new databases created from this point will have the postgis extension installed, including Django's test database, unless they specify a different template when creating a database.

If having postgis installed to all newly created databases is not desirable, you can create a new template, install postgis in it, and then have Django use this template when creating the test database.

$ createdb template_postgis;  # create a new database
$ psql -U postgres -c "UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template_postgis';"  # make it a template
$ psql -U postgres -d template_postgis -c "CREATE EXTENSION postgis;"  # install postgis in it
Then in Django settings:

...
DATABASES = {
    'default': {
        ...
        'TEST': {
            'TEMPLATE': 'template_postgis',
        },
    },
}