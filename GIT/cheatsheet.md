# Branches
## Fetch Branch from Remote

A simple command:

```sh
git fetch origin {branchname}
git checkout {branchname}
```

`git branch -d localBranchName`

delete branch: `git branch -d {name}`


## Push Branch to Remote

```sh
git push -u origin <branch>`
```

# Stash with message

`git stash push -m "my_stash"`

# Reverts

Undo the last commit `git reset --soft HEAD^`

Revert by commit hash `git revert {hash}`
Revert merge commit `git revert -m 1 {merge commit hash}`

# Stash

stash with name `git stash push -m {stashname}`


