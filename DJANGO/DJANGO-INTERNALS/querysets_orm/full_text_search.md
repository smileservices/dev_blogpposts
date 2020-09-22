# Fulltext Search

What is TsVector, what is Trigram?
https://stackoverflow.com/questions/15884309/postgresql-full-text-search-and-trigram-confusion

In short:
- Full Text Search is used to return documents that match a search query of stemmed words.
- Trigrams give you a method for comparing two strings and determining how similar they look.

text vector uses stemming to split a text into small parts while ignoring common words like 'and' 'or' etc
trigrams split strings in 3 consecutive chars and compare the number of common trigrams of each in order to output a score of similarity


## Tutorials
https://medium.com/@pauloxnet/full-text-search-in-django-with-postgresql-4e3584dee4ae
http://rachbelaid.com/postgres-full-text-search-is-good-enough/

## Using PostgreSQL Search Vector

A tsvector value is a sorted list of distinct lexemes (words that have been normalized to merge different variants of the same word). Sorting and duplicate-elimination are done automatically.


## Django - see SQL for applying migration

```python
python manage.py sqlmigrate <appname> <migration number eg. 0001 or 0004>
```

## Activate trigram extension

migration:
```python
from __future__ import unicode_literals

from django.db import migrations
from django.contrib.postgres.operations import UnaccentExtension
from django.contrib.postgres.operations import TrigramExtension


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('study_resource', '0010_auto_20200908_0626'),
    ]

    operations = [
        TrigramExtension(),
        UnaccentExtension(),
    ]

```

This results in the following SQL:
!note: run this connected to the specific database
```sql
BEGIN;
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
COMMIT;
```
need to run this command as db super admin or have create privileges


## Create Index for trigram:

1. Inside the Model
```python
class SomeModel(models.Model):
    name = models.CharField(max_length=128)
    summary = models.TextField(max_length=2048)

    class Meta:
        # index for two fields. notice that opclasses attribute needs to have as many items as number of fields!
        indexes = [
            GinIndex(fields=['name', 'summary'], name='gintrgm_index', opclasses=['gin_trgm_ops', 'gin_trgm_ops'])
        ]
```

2. Querying:
```python
# notice that we apply the TrigramSimilarity function to the field itself 
self.annotate(
    similarity=TrigramSimilarity('name', text) + TrigramSimilarity('summary', text)
).filter(
    similarity__gte=min_sim
).order_by(
    '-similarity'
)

```
