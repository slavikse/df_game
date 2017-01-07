#!/usr/bin/env bash

# ищет файлы по расширению и подсчитывает только те строки, которые не пусты
view=$(find source -name '*.html' -type f -print0 | xargs -0 cat | grep ^. | wc -l)
style=$(find source -name '*.css' -type f -print0 | xargs -0 cat | grep ^. | wc -l)
script=$(find source -name '*.js' -type f -print0 | xargs -0 cat | grep ^. | wc -l)

echo
echo "  view | ${view}"
echo " style | ${style}"
echo "script | ${script}"
echo '———————⟊—————'
echo " TOTAL | $(($view + $style + $script))"
echo ''
