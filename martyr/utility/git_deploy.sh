#!/usr/bin/env bash

cd public
git init
git remote add origin $1 # переданный параметр
git add .
git commit -m 'deploy'
git push -f origin master
