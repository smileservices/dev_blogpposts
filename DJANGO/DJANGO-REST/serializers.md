# these fuckers drive me mad!!!

Validation when having serializer fields: sucks!

```python
class TechnologyConceptSerializer(EditSuggestionSerializer):
    queryset = TechnologyConcept.objects.all()
    author = UserSerializerMinimal(many=False, read_only=True)
    technology = TechnologyMinimal(many=False, read_only=True)
    parent = CategoryConceptSerializerListing(many=False, read_only=True)

    class Meta:
        model = TechnologyConcept
        fields = ['pk', 'name', 'description', 'absolute_url', 'slug',
                  'parent', 'technology', 'experience_level',
                  'author', 'created_at', 'updated_at']

    @staticmethod
    def get_edit_suggestion_serializer():
        return TechnologyConceptEditSuggestionSerializer

    @staticmethod
    def get_edit_suggestion_listing_serializer():
        return TechnologyConceptEditSuggestionListingSerializer

    def run_validation(self, data):
        data_copy = data.copy()
        if 'slug' not in data:
            data_copy['slug'] = slugify(data['name'])
        validated_data = super(TechnologyConceptSerializer, self).run_validation(data_copy)
        # i can't find another way for this
        validated_data['technology_id'] = int(data_copy['technology'])
        if 'parent' in data_copy and data_copy['parent']:
            validated_data['parent_id'] = int(data_copy['parent'])
        return validated_data
```
