# Django - model UUIDField

## Why Hash Field?
Hash fields can be used to validate the integrity of data, speed up data retrieval, function as unique keys. We can use hash fields as keys for accessing non-public data like an order detail. The hash key can be embedded in the url and to access that data the user could supply his/her email address only. This technique requires no password to be remembered by the user but it decreases the security a bit so it's only to be used on content without important data and under no circumstances as a substitute to user/password login. 

## How we do this

The uuid field is available in Django >= 1.8.
[Link to Django docs on the subject](https://docs.djangoproject.com/en/2.0/ref/models/fields/#uuidfield)

```
import uuid
hash = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)
```

## Using the uuid field

To get the hash in a string form simply use 
```
model.hash.hex
```
