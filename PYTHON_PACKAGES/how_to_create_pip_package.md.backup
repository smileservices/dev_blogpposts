# How to create python package and publish it with pip

Resources:
https://packaging.python.org/
https://betterscientificsoftware.github.io/python-for-hpc/tutorials/python-pypi-packaging/
https://blog.jetbrains.com/pycharm/2017/05/how-to-publish-your-package-on-pypi/

## Create .pypirc config file
This holds the log in credentials for testpypi and pypi
For using the 2nd upload method without username&pass prompt
```bash
# ~/.pypirc

[distutils]
index-servers=
    testpypi
    pypi

[testpypi]
repository = https://test.pypi.org/legacy/
username = user
password = pass

[pypi]
repository = https://upload.pypi.org/legacy/
username = user
password = pas
```

## Project Structure (minimal)

pyexample
├── LICENSE
├── pyexample
│   ├── __init__.py
│   ├── module_numpy_1.py
│   └── module_numpy_2.py
├── README.rst
├── setup.py
└── setup.cfg


## Content of files:

```python
# setup.py

from setuptools import setup

setup(
    name='pyexample',
    version='0.2.0',
    description='A example Python package',
    url='https://github.com/smileservices/django-simple-history',
    author='Vladimir Gorea',
    author_email='vladimir.gorea@gmail.com',
    license='BSD 2-clause',
    packages=['pyexample'],
    install_requires=[], # packages listed here will be automatically installed

    classifiers=[
        'Development Status :: 1 - Planning',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
)
```

```python
# setup.cfg
[metadata]
long_description = file: README.md
long_description_content_type = text/markdown
```

## Install from local

```bash
pip install . 
# or 
pip install --upgrade .
# to uninstall
pip uninstall {package_name}
```
## Create a source distribution


### Test on test.pypi.org first
Make account on https://test.pypi.org and https://pypi.org

make the distribution:
```bash
python setup.py sdist
```
This will create a folder "dist" at the project root level and will contain the .tar.gz files

install twine, then, upload the .tar file to test.pypi.org:

1st method, being prompted for username & password
```bash
pip install twine 
twine upload --repository-url https://test.pypi.org/legacy/ dist/pyexample-0.1.0.tar.gz
```

2nd method, using the .pypirc file
```bash
pip install twine 
twine upload --repository testpypi dist/pyexample-0.1.0.tar.gz
```

Test install with ```pip install -i https://test.pypi.org/simple/ pip-packaging-example```


### Deploy on pypi.org finally

```twine upload dist/*```