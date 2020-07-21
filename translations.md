# Translations/Internationalization

DJANGO
https://docs.djangoproject.com/en/3.0/topics/i18n/translation

## Preparation
settings.py
```
LANGUAGE_CODE = 'en-us' #default language
USE_I18N = True
USE_L10N = True

LANGUAGES = [
    ('vn', _('Tiếng Việt')),
    ('en', _('English')),
]

LOCALE_PATHS = [ os.path.join(BASE_DIR, "locale"), ]
```

language is discovered either by url or by cookie:
url results to be "root.com/en/some/link":
```
from django.conf.urls.i18n import i18n_patterns

urlpatterns = i18n_patterns(
    path('jsi18n/', JavaScriptCatalog.as_view(), name='javascript-catalog'),
)
```

for cookie just set the "django_language" to language code you need. in settings.py you can set the cookie name by using LANGUAGE_COOKIE_NAME

## Use in templates

```
{% load i18n %}

{% trans "Sign In" %}
{% blocktrans with provider.name as provider_name %}Sign up using {{ provider.name }}{% endblocktrans %}
```


## Translate
https://docs.djangoproject.com/en/3.0/ref/django-admin/#django-admin-makemessages
```
python manage.py makemessages -e=html,py,txt
python manage.py autotranslate -u
python manage.py compilemessages
```

just modify the translation files resulted in LOCALE_PATH

Or use an auto translation tool
https://github.com/ankitpopli1891/django-autotranslate/

