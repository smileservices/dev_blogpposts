Python automatically compiles your script to compiled code, so called byte code, before running it.

Running a script is not considered an import and no .pyc will be created.

For example, if you have a script file abc.py that imports another module xyz.py, when you run abc.py, xyz.pyc will be created since xyz is imported, but no abc.pyc file will be created since abc.py isn’t being imported.

If you need to create a .pyc file for a module that is not imported, you can use the py_compile and compileall modules.

The py_compile module can manually compile any module. One way is to use the py_compile.compile function in that module interactively:

>>> import py_compile
>>> py_compile.compile('abc.py')
This will write the .pyc to the same location as abc.py (you can override that with the optional parameter cfile).

You can also automatically compile all files in a directory or directories using the compileall module.

python -m compileall
If the directory name (the current directory in this example) is omitted, the module compiles everything found on sys.path


## Install Any Python Version with apt-get

```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
```

then install python with specific version that you want to install as:

`sudo apt-get install python2.7`

OR

`sudo apt-get install python3.6`


## Virtualenv

create new `virtualenv -m {name}`
crete new with specific python version `virtualenv -p {path to python} -m {name}`