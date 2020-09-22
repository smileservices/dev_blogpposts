# Save model with many to many fields relationship

It's definitely not clearly put into the docs of django-rest. If you follow the process of serializers processing the data for creation then it becomes clear that django manages m2m by saving the parent instance first and then adding the m2m values, but somehow the m2m fields don't go through the validation if you mark them as read_only.

The solution to this is to overr run_validation method of the serializer. The serializer should look like this:

### Serializer:

```python
class StudyResourceSerializer(serializers.ModelSerializer):
    queryset = StudyResource.objects.all()
    author = UserSerializerMinimal(many=False, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    technologies = TechnologySerializerShort(many=True, read_only=True)

    class Meta:
        model = StudyResource
        fields = ['pk', 'name', 'name', 'url', 'summary', 'price_label', 'media_label', 'author', 'tags',
                  'technologies', 'created_at', 'updated_at', 'publication_date', 'published_by']

    def run_validation(self, data):
        validated_data = super(StudyResourceSerializer, self).run_validation(data)
        validated_data['tags'] = data['tags']
        validated_data['technologies'] = data['technologies']
        return validated_data
```

### Request

```json
{
  "url": "https://react-seleczzzzz",
  "name": "Dumbrava zzzz",
  "publication_date": "2020-08-17",
  "published_by": "Some Random Dude",
  "type": 1,
  "media": 3,
  "experience_level": 1,
  "summary": "With the Django REST Framework, you can generate a human-friendly HTML output for each resource when an HTML format is requested. These pages allow you to easily browse through resources, as well as build in forms to submit data to the resources using POST, PUT, and DELETE.",
  "tags": [51,54],
  "technologies": [76, 81]
}
```