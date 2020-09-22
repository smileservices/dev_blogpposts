Title: Important Unix Commands
Slug: important-linux-commands
Tags: linux, unix, cheatsheet
Category: Linux
Summary: Setting up logging is crucial to monitoring any app. This way you know what works and what doesn't. If done correctly it will save a lot of time of debugging.  
Date: 2018-02-03 10:20
Modified: 2020-07-05 19:30

## Resources for reading
[django logging the right way](https://lincolnloop.com/blog/django-logging-right-way/)
[django and logging in plain english](https://djangodeconstructed.com/2018/12/18/django-and-python-logging-in-plain-english/)
[django logging in production](https://mattsegal.dev/file-logging-django.html)


## Basic usage
1. Loggers are messages containers
2. Handlers are directing loggers to various output destinations like files, console, email, etc
3. Filters can be used for both loggers and handlers
4. Formatters handle how to output the messages. Belong to handlers

set up logging in settings.py
```
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

use logger
```
import logging
logger = logging.getLogger(__name__)
```