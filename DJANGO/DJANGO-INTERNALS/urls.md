# URLS ARE DRIVING ME CRAZY

```python
urlpatterns = [
    path('blog/<int:year>/', views.year_archive, {'foo': 'bar'}),
]
```
resulting url will be available at `/blog/2022`

# Using reverse:

```python

reverse('parent-viewset')

# using kwargs
reverse('parent-viewset-create-edit-suggestion', kwargs={'pk':2}) 
```

## Troubleshooting


### How to inspect urls:

```python

from django.urls import get_resolver
get_resolver().reverse_dict.keys()

```

Or, to get a list of all urls:

```python

from django.conf import settings
from django.urls import URLPattern, URLResolver

urlconf = __import__(settings.ROOT_URLCONF, {}, {}, [''])

    def list_urls(lis, acc=None):
        if acc is None:
            acc = []
        if not lis:
            return
        l = lis[0]
        if isinstance(l, URLPattern):
            yield acc + [str(l.pattern)]
        elif isinstance(l, URLResolver):
            yield from list_urls(l.url_patterns, acc + [str(l.pattern)])
        yield from list_urls(lis[1:], acc)

    for p in list_urls(urlconf.urlpatterns):
        print(''.join(p))
```