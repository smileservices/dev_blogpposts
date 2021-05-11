Title: Handling Images with Django and nginx in production
Category: Django
Tags: django, images, production-ready, versatileimagefield, thumbnails
Slug: django-handling-images-in-production
Summary: How to handle images in production with django and nginx is not difficult but the documentation on this subject is lacking. This is an article meant to address this issue by providing clear instructions and working examples on how to set up a production ready image handling with django and versatileimagefield. We cover which library is best to use for handling images and how to use it for creating thumbnails and serve them.
Date: 2020-09-22 10:00
Modified: 2020-09-22 19:30

### Intro
Everytime I have to implement adding images to a project I feel a "oh boy, here we go again" type of feeling. I've done it multiple times but each time I have to go through the process of searching through the django packages for something that can fulfill my requirements and then fiddling with storage/triggers for delete and templates. While the process is simple, the docs don't have fully working production grade examples. This is what this article is trying to do.

This is an article meant to address this issue by providing clear instructions and working examples on how to set up a production ready image handling with django and versatileimagefield. We cover which library is best to use for handling images and how to use it for creating thumbnails and serve them. We also set up a production ready working example along with nginx configuration.

### Libraries
- sorl-thumbnail.readthedocs.io
- https://easy-thumbnails.readthedocs.io/
- https://django-versatileimagefield.readthedocs.io/


### Requirements
When processing user uploaded images we have to take care of processing them: 
1. Validate image
2. Save Image to storage
3. Create optimized thumbnails on saving an image
4. If delete parent model, have to delete the files also


### Versatile Image Field
I think this is the best image handling library to work with Django as it has the most features and is widely used in big projects like Saleor.

Pros: 

- Widely used
- Easy to set up

Cons:

- Need to use the post_delete signal to clear the files and post_save to create the thumbnails:
```python
# someapp/models.py
from django.db import models
from django.dispatch import receiver

from versatileimagefield.fields import VersatileImageField

class ExampleImageModel(models.Model):
    image = VersatileImageField(upload_to='images/')

@receiver(models.signals.post_delete, sender=ExampleImageModel)
def delete_ExampleImageModel_images(sender, instance, **kwargs):
    """
    Deletes ExampleImageModel image renditions on post_delete.
    """
    # Deletes Image Renditions
    instance.image.delete_all_created_images()
    # Deletes Original Image
    instance.image.delete(save=False)
```

### Install

Add with pip
```bash
pip install django-versatileimagefield
```

In settings.py
```python
INSTALLED_APPS = (
    # All your other apps here
    'versatileimagefield',
)
```

Use in models:
```python
from versatileimagefield.fields import PPOIField, VersatileImageField

class SomeModel(models.Model):
    image = VersatileImageField(
        upload_to="images", blank=True, null=True
    )
```

Display in template `<img src="{{ result.image.image_file.thumbnail.350x350 }}">`

### Example model with image field from URL (for scraped content):
How it works:

1. The model has an image_url field linking to an external image file
2. Upon saving the model we get the image from the url and save it to the image_file field


```python

# models.py
class StudyResourceImage(models.Model):
    study_resource = models.ForeignKey(StudyResource, on_delete=models.CASCADE, related_name='images')
    image_file = VersatileImageField(upload_to='tutorials', blank=True, null=True)
    image_url = models.URLField(default='', blank=True, null=True)

    def save(self, *args, **kwargs):
        # this saves the image from url anytime model is created with image_url
        if self.image_url and not self.image_file:
            img_temp = NamedTemporaryFile(delete=True)
            img_temp.write(urlopen(self.image_url).read())
            self.image_file.save(f"image_{self.study_resource.pk}_{uuid4().__str__()}.{self.image_url.split('.')[-1]}", File(img_temp))
            img_temp.flush()t
        else:
            super(StudyResourceImage, self).save(*args, **kwargs)
```

### Example implementation of VersatileImageField for production
- Delete all produced images sets with post_delete signal
- Create thumbs each time we save/update the image
- Use VERSATILEIMAGEFIELD_RENDITION_KEY_SETS for specifying how we create the thumbnails


```python
# settings.py

VERSATILEIMAGEFIELD_RENDITION_KEY_SETS = {
    'image': [
        ('small', 'thumbnail__180x180'),
        ('medium', 'thumbnail__220x220'),
        ('large', 'thumbnail__320x320'),
    ],
}

MEDIA_ROOT = env('MEDIA_ROOT')
MEDIA_URL = env('MEDIA_URL')
```

Inside the .env file:
```
MEDIA_ROOT=/home/user/MEDIA
MEDIA_URL=/media/
```

```python
# models.py

from versatileimagefield.fields import VersatileImageField
from versatileimagefield.image_warmer import VersatileImageFieldWarmer
from versatileimagefield.utils import build_versatileimagefield_url_set


class ImageModel(models.Model):
    image_file = VersatileImageField(upload_to='images', blank=True, null=True)

    @property
    def sizes(self):
        '''
        to get access to image size key sets by dictionary
        this returns {
            small: url_to_small_thumb,
            medium: url_to_medium_thumb,
            large: url_to_large_thumb,
        }
        '''
        return build_versatileimagefield_url_set(
            self.image_file,
            settings.VERSATILEIMAGEFIELD_RENDITION_KEY_SETS['image']
        )


@receiver(models.signals.post_delete, sender=ImageModel)
def delete_images(sender, instance, **kwargs):
    """
    Deletes Image image renditions on post_delete.
    """
    instance.image_file.delete_all_created_images()
    instance.image_file.delete(save=False)


@receiver(models.signals.post_save, sender=ImageModel)
def warm_images(sender, instance, **kwargs):
    """Ensures Person head shots are created post-save"""
    sr_images_warmer = VersatileImageFieldWarmer(
        instance_or_queryset=instance,
        rendition_key_set='image', # name of keyset key
        image_attr='image_file'    # name of versatileimagefield field on the model
    )
    # this should be logged somewhere to catch potential errors
    num_created, failed_to_create = sr_images_warmer.warm()
```

If we'are using django-rest and serving serialized instances we need to make a serializer:
```python
# serializers.py
from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer

class ImageModelSerializer(serializers.ModelSerializer):
    image_file = VersatileImageFieldSerializer(
        sizes = settings.VERSATILEIMAGEFIELD_RENDITION_KEY_SETS['image']
    )

    class Meta:
        model = ImageModel
        fields = ['pk', 'image_file']

```

This is how we access the images sets in template: 
`<img class="primary-image" src="{{ image_model_instance.sizes.medium }}" alt="">`

# Serving media files with NGINX

To serve the static files in production we have to point to the absolute path of Media folder. 
Inside the nginx configuration file /etc/nginx/sites-available/<filename>

```bash
    location /media/ {                                                                           
        alias /home/user/MEDIA/;                                
    }
```

Next, test the config file and restart the services

```bash
nginx -t
systemctl restart nginx.service
systemctl restart <app gunicorn instance>
```
