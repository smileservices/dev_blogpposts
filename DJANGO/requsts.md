# Sending a multipart type of request using `requests`


For passing data along side files:

```python
requests.post(
    url=url,
    data=payload_dict,
    files={
        'key': (filename, open(filepath, 'rb'), 'image/jpeg')
    }
)
```

This has been tested with django and django-rest. The `payload_dict` will get into `request.POST` 
while the files will get into `request.FILES`

