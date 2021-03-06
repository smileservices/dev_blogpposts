# How to create Django Packages

http://hirokiky.org/tech/create_django_library.html
https://docs.djangoproject.com/en/3.1/intro/reusable-apps/

## Used tools:
- makefile      automating of tasks; linux utility

- sphinx        automating writing docs
https://sphinx-tutorial.readthedocs.io/start/

- tox           automating testing
- coverage      analyzing test coverage for tests

.. _tox: http://testrun.org/tox/latest//
.. _coverage: http://nedbatchelder.com/code/coverage/
.. _sphinx: http://sphinx-doc.org/

Guide on how to create pip packages for Django
- setting up
- project structure
- workflow
- tests
- deploy on pip

## Setting up
Set up like any other pypi package:
- create a ~/.pypirc config file if not already
- use same structure like any other pypi
- create runtests.py for running tests and set up the django config there
- install django to use when testing

## Project structure

django-edit-suggestion/
├── LICENSE.txt
├── README.md
├── django_edit_suggestion
│   ├── __init__.py
│   ├── __pycache__
│   ├── apps.py
│   ├── exceptions.py
│   ├── manager.py
│   ├── middleware.py
│   ├── models.py
│   └── tests
├── docs
├── requirements.txt
├── runtests.py
├── setup.cfg
├── setup.py


## Workflow

## Tests
- Must have a runtests.py file at project root. It will host the django test settings
- Inside the project - the distributable folder - have a tests folder with everything required for setting up the tests and the tests module (file or folder)

```python
# runtests.py
#!/usr/bin/env python
import logging
import sys
import django
from django.conf import settings
from django.test.runner import DiscoverRunner

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "django.contrib.sessions",

    "django_packaging", # package to be tested
    "django_packaging.tests", # test module to be run
]

MIDDLEWARE = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]

DEFAULT_SETTINGS = dict(
    SECRET_KEY="not a secret",
    ALLOWED_HOSTS=["*"],
    INSTALLED_APPS=INSTALLED_APPS,
    DATABASES={
        "default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"},
    },
    MIDDLEWARE=MIDDLEWARE
)

def main():
    if not settings.configured:
        settings.configure(**DEFAULT_SETTINGS)
    django.setup()
    tags = [t.split("=")[1] for t in sys.argv if t.startswith("--tag")]
    failures = DiscoverRunner(failfast=False, tags=tags).run_tests(
        ["django_packaging.tests"]
    )
    sys.exit(failures)

if __name__ == "__main__":
    logging.basicConfig()
    main()
```

Example of tests.py test:
```python
# tests.py
from django.test import TestCase
from django_packaging.module_1 import test
from .models import PeasyModel


class SimpleTest(TestCase):

    def test_module_function(self):
        self.assertEqual(test(), 'perfect')

    def test_model(self):
        p_i = PeasyModel(boobs=test())
        p_i.save()
        p_s = PeasyModel.objects.first()
        self.assertEqual(p_s.boobs, 'perfect')

```

## Pip deployment
- like normal project or use travis (CI tool) to use github hooks for automatic testing/build