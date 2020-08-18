#! /bin/bash

# housekeeping
rm -fr ./publish ./dist
mkdir ./publish

# set up the source README for extension reviewers
sed -e "s/\[\[npm-version\]\]/$(npm --version)/" < reviewer-notes.md | sed -e "s/\[\[node-version\]\]/$(node --version)/" > README

# package up source code
zip -r ./publish/bb-booster.source.zip package.json npm-shrinkwrap.json src tsconfig.json README

# build and pack extension
npm run-script build

cd ./dist
zip -r ../publish/bb-booster.zip ./*
