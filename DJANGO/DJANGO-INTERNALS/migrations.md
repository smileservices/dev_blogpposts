# Migrations and Models

## How does the makemigrations parse the models?


[good article about contribute_to_class](https://lazypython.blogspot.com/2008/11/django-models-digging-little-deeper.html)
[deeper django orm and contribute_to_class](https://www.b-list.org/weblog/2019/mar/04/class/)

A. django_setup() is run for loading up all app config
    .. django/db/models.base.py
    .... ModelBase __new__
1. every app is configured and models are parsed for loading them
2. each model is parsed and the fields classes that have `contribute_to_class` are put in a list
```python
# attrs is a dict with all the Model's attributes
for obj_name, obj in list(attrs.items()):
if _has_contribute_to_class(obj):
    contributable_attrs[obj_name] = obj
else:
    new_attrs[obj_name] = obj
```
3. a new class is instantiated
```python
new_class = super_new(cls, name, bases, new_attrs, **kwargs)
```
4. Add remaning attrs to the new class
```python
# Add remaining attributes (those with a contribute_to_class() method)
# to the class.
for obj_name, obj in contributable_attrs.items():
    new_class.add_to_class(obj_name, obj)

# ...
def add_to_class(cls, name, value):
    if _has_contribute_to_class(value):
        value.contribute_to_class(cls, name)
    else:
        setattr(cls, name, value)
```
