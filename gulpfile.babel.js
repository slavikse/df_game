/* БЫСТРЫЕ КОМАНДЫ:
  Запушить изменения:
  git push -u origin master
  
  Сборка на продакшн:
  NODE_ENV=production gulp
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
    'service_client',
    // 'sprite',
    'style',
    'style_lib',
    'svg',
    'view'
  ];

let tasksWatch = [];
tasksBuild.forEach((task) => {
  if (task === 'script') { return } // webpack следит
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
      'del',
      'build'
    ) :
    gulp.series(
      'del',
      'build',
      'watch'
    )
);
