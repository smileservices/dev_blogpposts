# Set up

## install
```
pip install djangorestframework
```

settings.py
```
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
## serializers


## urls
```
from rest_framework import routers
from jobhound.views import JobViewSet

router = routers.DefaultRouter()
router.register('jobs', JobViewSet, basename='jobs')
```

### PrimaryRelatedField

- related_name argument on related model ForeignKey should match both "field name" of the serializer and also be inside fields tuple
```
owner = models.ForeignKey('auth.User', related_name='snippets')

class UserSerializer(serializers.ModelSerializer):
    snippets = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'snippets')
```


