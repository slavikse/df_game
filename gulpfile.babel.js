/* БЫСТРЫЕ КОМАНДЫ:
  Запушить изменения:
  git push -u origin master
  
  Сборка на продакшн:
  NODE_ENV=production gulp
*/

import gulp from 'gulp'
import register from './.system/register'

register();

const
  production = process.env.NODE_ENV === 'production',
  tasksBuild = [
    'font',
    'image',
    'resize',
    'script',
    'service',
    'sprite',
    'style',
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
    gulp.series( // production
      'del',
      'build',
      'zip'
    ) :
    gulp.series( // build
      'del',
      'build',
      gulp.parallel(
        'bs',
        'watch'
      )
    )
);

//TODO какая то ошибка при завершении всех задач. проверить выполнение build в этом файле