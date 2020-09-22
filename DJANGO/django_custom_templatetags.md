# Django Template Tags

https://docs.djangoproject.com/en/2.1/howto/custom-template-tags/

Create inside main project folder :

templatetags
-- __init__.py
-- {tag_name}.py

{tag_name}.py:
```
from django import template
from django.conf import settings

register = template.Library()

# settings value
@register.simple_tag
def settings_value(name):
    return getattr(settings, name, "")
```

add to settings.INSTALLED_APPS the main project and {main_project_name}.templatetags.{tag_name}

Restart the server

