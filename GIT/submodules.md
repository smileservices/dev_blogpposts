# Git Submodules


## Add submodule
```
git submodule add <url>
```

## Pulling submodules inside a cloned repo

```
git submodule init && git submodule update
```

https://www.w3docs.com/snippets/git/how-to-pull-the-latest-git-submodule.html

To pull latest versions of all submodules
```bash
git pull --recurse-submodules
```

## Pulling/Pushing updates in git submodule
Go into each submodule root and do `push` / `pull` commands
