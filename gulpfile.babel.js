//TODO править, актуализировать

/* БЫСТРЫЕ КОМАНДЫ

Запушить изменения:
git push -u origin master

Сборка на продакшн:
NODE_ENV=production gulp

Сборка и запуск сервера:
gulp build && node BUILD/server/app

Запуск продакшн сборки и сервера с npm i:
NODE_ENV=production gulp &&
npm i --prefix BUILD/server &&
node BUILD/server/app

#========== ПРИ ДОБАВЛЕНИИ ===========>

БИБЛИОТЕКИ:
  0. Взять из npm или поместить в /lib
  1. Прописать путь в vendors:
  1.1. Клиент (css,js): .system/add_lib
  1.2. Сервер (js): source/server/add_lib

ЗАДАЧИ:
  0. Добавить в директорию: build / minify / service
  * перед именем [цифра]_ - порядок в очереди на выполнение (для build и minify)
  1*. [Только для service!] Добавить в gulpfile в очередь
*/

import gulp from 'gulp'
import run from './.system/run'

run();

const PRODUCTION = process.env.NODE_ENV === 'production';

gulp.task('default', PRODUCTION ?
  gulp.series('font', 'sprite') :
  gulp.series(gulp.parallel('font_watch'))
);




/* TODO доработать серверную сборку: проверить и все такое
  TODO на доработке. настройка forever. https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make обновить браузер при обновлении сервера. сервер и bs на разных портах... как быть
gulp.task('server',
  gulp.series(
    'build'
    gulp.parallel(
      'watch'
      'bs'
      'run_server'
    )
  )
)
*/