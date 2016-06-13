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

const
  production = process.env.NODE_ENV === 'production',
  tasksBuild = [
    'font',
    'image',
    'lazy_lib',
    // 'resize',
    'script',
    'script_lib',
    'service_client',
    // 'sprite',
    'style',
    'style_lib',
    'svg',
    'view'
  ];

let tasksWatch = [];
tasksBuild.forEach((task) => {
  tasksWatch.push(`${task}_watch`)
});

gulp.task('build',
  gulp.parallel(tasksBuild)
);

gulp.task('watch',
  gulp.parallel(tasksWatch)
);

gulp.task('default',
  production ?
    gulp.series(
    ) :
    gulp.series(
      'del',
      'build',
      'watch'
    )
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