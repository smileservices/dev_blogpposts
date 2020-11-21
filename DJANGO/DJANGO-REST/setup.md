# Set up

## install
```bash
pip install djangorestframework
```

settings.py
```python
INSTALLED_APPS = (
    ...
    'rest_framework',
)

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}

```

## models
```python
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    status = models.BooleanField()


class NutritionalInformation(models.Model):
    class Unit(models.TextChoices):
        PIECE = 'pc', 'Piece'
        KG = 'kg', 'Kilogram'

    name = models.CharField(max_length=256)
    unit = models.CharField(
        max_length=2,
        choices=Unit.choices,
        default=Unit.PIECE
    )
    value = models.IntegerField()
    product = models.ForeignKey(Product, related_name='nutritional_value', on_delete=models.CASCADE)

```
## serializers
```python
from rest_framework import serializers
from food.models import Product, NutritionalInformation


class NutritionalValuesSerializer(serializers.ModelSerializer):
    queryset = Product.objects.all()

    class Meta:
        model = NutritionalInformation
        fields = ['name', 'unit', 'value']


class ProductSerializer(serializers.ModelSerializer):
    queryset = Product.objects.all()
    nutritional_values = NutritionalValuesSerializer(many=True)

    class Meta:
        model = Product
        fields = ['name', 'description', 'status', 'nutritional_values']
```

## views

```python
# admin views
class ProductViewset(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]


class NutritionalValueViewset(ModelViewSet):
    queryset = NutritionalInformation.objects.all()
    serializer_class = NutritionalValuesSerializer
    permission_classes = [IsAdminUser]


# frontend views
class ProductReadOnlyViewset(ReadOnlyModelViewSet):
    queryset = Product.objects.filter(status=True).all()
    serializer_class = ProductSerializer

```

## urls
```python
from rest_framework import routers

router = routers.DefaultRouter()
router.register('food', food_views.ProductReadOnlyViewset, basename='frontend_list_food')

urlpatterns = [
    path('', views.homepage, name='homepage'),
]

urlpatterns += router.urls
```

### PrimaryRelatedField

- related_name argument on related model ForeignKey should match both "field name" of the serializer and also be inside fields tuple
```python
owner = models.ForeignKey('auth.User', related_name='snippets')

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets')
```


