#!/usr/bin/env bash

URI='https://github.com/slavikse/df_game.git'

cd public
git init
git remote add origin ${URI}
git add .
git commit -m 'game'
git push -f origin master
