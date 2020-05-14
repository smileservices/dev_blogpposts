# Scripting

## Invoking env from a script
use subprocess lib and call the venv pip executable

make new env and install requirements from i
```
os.system(f'virtualenv {VENV_NAME}')
subprocess.call([
    os.path.join(CWD_PATH,f'{VENV_NAME}/Scripts/pip.exe'),
    'install', '-r', REQUIREMENTS_FILE
])
```