# Django Environ

## For managing multiple deployment settings
https://django-environ.readthedocs.io/en/latest/#how-to-use
https://github.com/joke2k/django-environ

## How to use
- install
```
pip install django-environ
```

- create .env file
```
DEBUG=on
SECRET_KEY=your-secret-key
DATABASE_URL=psql://urser:un-githubbedpassword@127.0.0.1:8458/database
SQLITE_URL=sqlite:///my-local-sqlite.db
POSTGRESQL_URL=postgres://username:password@localhost:5431/dbname
CACHE_URL=memcache://127.0.0.1:11211,127.0.0.1:11212,127.0.0.1:11213
REDIS_URL=rediscache://127.0.0.1:6379/1?client_class=django_redis.client.DefaultClient&password=ungithubbed-secret
```


- in settings.py:
```
import environ
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

env = environ.Env(
    DEBUG=bool,
    SECRET_KEY=str,
    ALLOWED_HOSTS=list,
    INTERNAL_IPS=list,
    EMAIL_HOST=str,
    EMAIL_PORT=int,
    EMAIL_HOST_USER=str,
    EMAIL_HOST_PASSWORD=str,
    EMAIL_USE_TLS=bool,
    DATABASE_URL=str,
    EMAIL_ADDRESS_NOTIFICATIONS=str,
    PAYPAL_TEST=bool,
    PAYPAL_RECEIVER_EMAIL=str,
    INVOICE_SETTINGS=list,
)

env_path = os.path.join(BASE_DIR, '.env')
environ.Env.read_env('.env')

SECRET_KEY = env.str('SECRET_KEY')
```