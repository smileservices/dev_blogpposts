# Logging

https://lincolnloop.com/blog/django-logging-right-way/
https://djangodeconstructed.com/2018/12/18/django-and-python-logging-in-plain-english/

## set up logging in settings.py


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': env.str('LOG_FILE_PATH'),
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

## use logger

import logging
logger = logging.getLogger(__name__)