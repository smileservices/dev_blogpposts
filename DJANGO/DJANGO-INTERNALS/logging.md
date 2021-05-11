Title: Django Logging
Slug: django-logging
Tags: django, logging
Category: Django
Summary: Setting up logging is crucial to monitoring any app. This way you know what works and what doesn't. If done correctly it will save a lot of time of debugging.  
Date: 2019-04-03 10:20
Modified: 2020-07-05 19:30

### Intro
Setting up logging is crucial to monitoring any app. This way you know what works and what doesn't. If done correctly it will save a lot of time of debugging.  

### Django implementation of logging

Django uses the pyhton logging module. Concepts to understand are `loggers`, `handlers`, `filters` and `formatters`:
1. Loggers are messages containers
2. Handlers are directing loggers to various output destinations like files, console, email, etc
3. Filters can be used for both loggers and handlers
4. Formatters handle how to output the messages. Belong to handlers

### Basic usage
Set up logging in settings.py

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
    'django': {
        'handlers': ['console'],
        'level': 'DEBUG',
        'propagate': True,
    },
    'someapp.urls': {
        'handlers': ['console'],
        'level': 'DEBUG',
        'propagate': True,
    }
}
```

Set up logging in your app:

```python
import logging
logger = logging.getLogger(__name__)
```

### Resources for reading
These resources are great for understanding why and how to use logging in Django:
1. [django logging the right way](https://lincolnloop.com/blog/django-logging-right-way/)
2. [django and logging in plain english](https://djangodeconstructed.com/2018/12/18/django-and-python-logging-in-plain-english/)
3. [django logging in production](https://mattsegal.dev/file-logging-django.html)