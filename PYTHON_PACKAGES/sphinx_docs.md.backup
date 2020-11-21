# Using Sphinx for creating documentation

Sphinx is an utility to automate creating a browserable documentation in html format


## How to use it

- install with ```pip install sphinx```
- create a doc folder and inside it do ```sphinx-quickstart``` to initally configure the docs
- put the .rst doc files inside the doc folder
- update index.rst to contain the existing doc files

```r
# docs/index.rst

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   install
   support
```

- issue the build command ```make html``` or ```make clean html``` to force redo all files
- the docs will be available in docs/_build/html


## Use RTD theme

- Install it ```pip install sphinx-rtd-theme```
- Update the sphinx conf.py:

```python
# docs/conf.py

import sphinx_rtd_theme
html_theme = 'sphinx_rtd_theme'
html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]
```


## Use autodoc

autodoc is helpful because it parses the actual code base and retrieves code comments

The code comments can be written in multiple ways, but the native way for sphinx is between """:

```python

def test():
    """
    Just a test function for testing the sphinx autodoc
    
    :return: str: perfect
    """
    return 'perfect'
```


- Add ```autodoc``` extension and set source code path

```python
# conf.py

import os
import sys
sys.path.insert(0, os.path.abspath('../django_packaging'))

extensions = ['sphinx.ext.autodoc',]
```

- Add the directive inside the doc file:

```rst
# some doc file

Autodoc
=======

.. automodule:: django_packaging.module_1
    :members:

```