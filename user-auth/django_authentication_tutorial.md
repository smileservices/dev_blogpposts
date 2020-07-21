# Using Django2.1 Auth for custom login screen for admin

# Implementing Authentication with django-allauth (best library)

1. pip install django-allauth
2. settings.py
```
INSTALLED_APPS = [
    ...
    'django.contrib.sites',  # make sure sites is included
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
# the social providers
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.twitter',
    ...
]

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend', # existing backend
    'allauth.account.auth_backends.AuthenticationBackend',
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                # Already defined Django-related contexts here

                # `allauth` needs this from django
                'django.template.context_processors.request',
            ],
        },
    },
]

# Provider specific settings
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        'APP': {
            'client_id': '123',
            'secret': '456',
            'key': ''
        }
    }
}

SITE_ID = 1
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
```
3. urls.py
```
urlpatterns = [
    ...
    path('accounts/', include('allauth.urls')),
    ...
]
```
4. manage.py migrate


django-allauth implementation
https://medium.com/@ksarthak4ever/django-custom-user-model-allauth-for-oauth-20c84888c318

# Need for testing:

https://django-extensions.readthedocs.io/
runserver ssl - runserver_plus from django-extensions
pip install django-extensions
pip install Werkzeug
pip install pyOpenSSL 

For facebook:
- Edit /etc/hosts file to make 127.0.0.1 point to mylocal.com
- Add https://mylocal.com to App Domains
- Add https://mylocal.com:8000/accounts/facebook/login/callback/ to Valid OAuth Redirect URIs