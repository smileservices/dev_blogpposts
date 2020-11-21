# Edit Suggestion App
Give any model ability to have users creating edit suggestions

EditSuggestion instances 
- can be modified/deleted by the author of each instance
- status can be "under review", "rejected" and "published"
- status change need to pass a condition
- changing the status to "published" updates the tracked model and locks the edit suggestion from being edited/deleted

## Implementation

Requires Users, django-rest-framework

Model has a field "edit_suggestion" that instantiates EditSuggestion
A serializer module and parent serializer is passed as a tuple ex: 
```python
EditSuggestion(
    excluded_fields=['search_vector_index', 'history'],
    m2m_fields=({'name': 'xx', 'model': 'xx', 'through': '-optional',}), 
    change_status_condition=callable_function(user, tracked_model_instance, edit_suggestion_instance),
    bases=(VotableMixin,),
    user_class=CustomUser, #optional. uses the default user model
)
```
At django initializing stage the Edit Suggestion App creates a model for each Model having this field ex: "EditSuggestionTechnology" 

Using the pre_save signal on the edit suggestion instance we check for status change and if it's change we check the change_status_condition. If the status changed to "published" 

- can access the model by TrackedModel.edit_suggestions.model