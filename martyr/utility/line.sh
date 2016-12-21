#!/usr/bin/env bash

view=$(find source -name '*.html' -type f -print0 | xargs -0 cat | wc -l) &&
style=$(find source -name '*.css' -type f -print0 | xargs -0 cat | wc -l) &&
script=$(find source -name '*.js' -type f -print0 | xargs -0 cat | wc -l) &&

echo && echo '»»»»»»' && echo &&
echo "view: ${view}" &&
echo "style: ${style}" &&
echo "script: ${script}" &&
echo '____________' &&
echo "TOTAL: $(($view+$style+$script))" &&
echo && echo '»»»»»»' && echo ''
