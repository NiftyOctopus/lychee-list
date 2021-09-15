# Make sure we are on the dev branch
branch=$(git branch --show-current)

if [ "$branch" = 'dev' ]; then :
else
    echo "Wrong branch [$branch]"
    exit 1
fi

# Make sure there are no uncommitted changes
status=$(git status --porcelain)

if [ -n "$status" ]; then
    echo 'Commit changes first'
    exit 1
fi

# Get version level if not already specified
if [ -z "$1" ]; then
    echo 'Version level? [patch, minor, major]'
    read level
else
    level="$1"
fi

# Check if version level is valid
if [[ ' patch minor major ' == *" $level "* ]]; then :
else
    echo "Invalid version level [$level]"
    exit 1
fi

# Increment app version and commmit
npm version "$level"

# Push dev branch
echo ''
echo 'Pushing dev branch'
git push origin dev

# Switch to master branch
echo ''
git checkout master

# Make sure we are on the master branch
branch=$(git branch --show-current)

if [ "$branch" = 'master' ]; then :
else
    echo "Wrong branch [$branch]"
    exit 1
fi

# Merge dev branch into master
echo ''
echo 'Merging dev into master'
git merge dev

# Push master branch
echo ''
echo 'Pushing master branch'
git push origin master

# Switch back to dev branch
echo ''
git checkout dev
echo ''