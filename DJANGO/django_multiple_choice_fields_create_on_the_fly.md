# How to create on the fly options for multiple choice fields

1. select2 
```
    $('select[name="tags"]').select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });
```

2. parse post response and create tags if they don't exist

do a form.is_valid() to get .cleaned_data attribute on form
form.cleaned_data['tags'] set to empty list
go through each form.data['tags'] and check if it exists in the db or not. if not, create. push instance of tag to form.cleaned_data['tags']
remove the errors from tags - form._errors.pop('tags',None)
then save the form!