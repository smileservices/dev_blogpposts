# Building forms with react
keep rerenderings to minimum. only react and html, javascript

Based on: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f


## uploading files with fetch
It's a headache because of how to set contenttype and how to get the value from the input

Input props:
```js
    ...
    value: formData['image_file']['name'],
    onChange: e => setFormData({
        ...formData,
         image_file: {
             content: e.target.files[0],
              name: e.target.value
            }
    })
    ...
```
When normalizing data just send the file content

Fetch headers:
```js
{
    Accept: 'Accept': '*/*',
}
```

```ContentType``` should be deleted because it's automanaged by the browser :((