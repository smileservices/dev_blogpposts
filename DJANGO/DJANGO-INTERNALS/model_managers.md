# Model managers

https://djangobook.com/advanced-models/


# How to use annotate inside models

From https://stackoverflow.com/questions/59954022/django-queryset-with-annotate:

What you are lookig for is :
```python
from django.db import models
from django.db.models import Sum
from django.db.models.functions import Coalesce


class AuthorManager(models.Manager):
    def get_queryset(self):
        return AuthorQuerySet(self.model, using=self._db)

    def annotate_with_copies_sold(self):
        return self.get_queryset().annotate_with_copies_sold()


class AuthorQuerySet(models.QuerySet):
    def annotate_with_copies_sold(self):
        return self.annotate(copies_sold=Sum('books__copies_sold'))


class Author(models.Model):
    objects = AuthorManager()
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Book(models.Model):
    title = models.CharField(max_length=30)
    copies_sold = models.PositiveIntegerField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
```

Now it is possible to chain queries e.g.:
```python
author_total_books = Author.objects.total_copies_sold().first()
```
However you will no be able to use it on QuerySet object like:

```python
author_books = Author.objects.filter(id=2).total_copies_sold()
```
That is because you are annotating Author object, not a QuerySet. To obtain that result you should execute:

```python
Author.objects.annotate_with_copies_sold().get(id=2)
author.copies_sold 
15
```