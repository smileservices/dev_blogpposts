# Testing With Django/DjangoRest


## setUp method
- runs before every test

## tearDown method
- runs after every test

After each test is ran, the database is flushed


```python
from rest_framework.test import APITestCase


class BigTest(APITestCase):

    def setUp(self) -> None:
        print('set up')
        create_bulk_users(5)
        create_categories()
        create_tags()
        create_technologies()
        self.tags = Tag.objects.all()
        self.categories = Category.objects.all()
        self.technologies = Technology.objects.all()

    def tearDown(self) -> None:
        print('tear down')

    def test_a(self):
        print('a')
        self.assertEqual(1,1)

    def test_b(self):
        print('b')
        self.assertEqual(2, 2)

    def test_c(self):
        print('c')
        self.assertEqual(2, 2)

```