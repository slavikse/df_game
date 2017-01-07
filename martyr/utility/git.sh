#!/bin/bash

cd public
git init
git remote add origin $1 # передается в параметре
git add .
git commit -m 'deploy'
git push -f origin master
