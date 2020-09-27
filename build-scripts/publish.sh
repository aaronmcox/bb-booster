#! /bin/bash

buildScriptsDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# housekeeping
rm -fr ./publish ./dist
mkdir ./publish

# set up the source README for extension reviewers
sed -e "s/\[\[npm-version\]\]/$(npm --version)/" < reviewer-notes.md | sed -e "s/\[\[node-version\]\]/$(node --version)/" > README

bbbVersion=$(node ${buildScriptsDir}/get-version.js)

# package up source code
zip -r ./publish/bb-booster.source-${bbbVersion}.zip package.json npm-shrinkwrap.json src tsconfig.json README

# build and pack extension
npm run-script build

cd ./dist
zip -r ../publish/bb-booster-${bbbVersion}.zip ./*
