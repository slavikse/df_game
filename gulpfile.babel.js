/* ***** КОМАНДЫ ***** *\

  Запушить изменения:
git push -u origin master
  
  Сборка на продакшн:
NODE_ENV=production gulp

  Запустить туннель:
NODE_ENV=tunnel gulp

************************/

import gulp from 'gulp'
import register from './.martyr/register'

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
    gulp.series( // development
      'del',
      'build',
      gulp.parallel(
        'bs',
        'watch'
      )
    )
);

//TODO (не критично) какая то ошибка при завершении watch задачи
