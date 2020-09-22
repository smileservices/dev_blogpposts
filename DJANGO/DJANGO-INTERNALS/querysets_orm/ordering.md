# Ordering

## Ordering where columns can have NULL values
 

```python
from django.db import models

ArticleQueryset.annotate(
    rating=models.Avg('reviews__rating')
).order_by(
    models.F('rating').desc(nulls_last=True)
    )
```