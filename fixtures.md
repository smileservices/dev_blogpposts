# Data Fixtures

## create data:
python manage.py dumpdata
- creates fixtures

## Set up

- good to have fixtures folder in the root

settings.py
```
FIXTURE_DIRS = [
    'fixtures',
]
```

https://docs.djangoproject.com/en/2.2/howto/initial-data/
## run fixtures

- loads specific fixture
```
python manage.py loaddata {fixture name}
```

- can use reg exp
```
python manage.py loaddata myfixtures/*.json
```
