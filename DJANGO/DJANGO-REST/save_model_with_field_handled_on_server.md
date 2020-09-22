
# Saving a model that require fields filled on backend
ex: article json request data has {title: , text: } but you also need to make the author the user that submitted the request.

* just override the perform_create method of the CreateMixin. 
* insert the required field when calling the serializer.save method

```
class ReviewVieset(ModelViewSet):
    serializer_class = serializers.ReviewSerializer
    queryset = serializers.ReviewSerializer.queryset.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        raise PermissionDenied(detail='Not allowed to list all reviews')

    def perform_create(self, serializer):
        try:
            serializer.save(author=self.request.user)
        except IntegrityError:
            raise PermissionDenied(detail='You already reviewed this. Only one review per resource is allowed for any user')
```