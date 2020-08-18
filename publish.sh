#! /bin/bash

rm -fr ./publish ./dist
mkdir ./publish

npm run-script build

zip -r ./publish/bb-booster.source.zip package.json npm-shrinkwrap.json src tsconfig.json
zip -r ./publish/bb-booster.zip dist/*
