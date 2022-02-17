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

# Pull dev branch
echo ''
echo 'Pulling dev branch updates'
git pull origin dev

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

# Pull master branch
echo ''
echo 'Pulling master branch updates'
git pull origin master

# Push master branch
echo ''
echo 'Pushing master branch'
git push origin master

# Switch back to dev branch
echo ''
git checkout dev
echo ''