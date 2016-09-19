/* ***** КОМАНДЫ ***** *\
 Запушить изменения:
 git push -u origin master

 Сборка на продакшн:
 NODE_ENV=production gulp

 Сборка на продакшн + туннель:
 NODE_ENV=production gulp && NODE_ENV=tunnel gulp bs

 Запустить дев туннель:
 NODE_ENV=tunnel gulp

 Запустить туннель:
 NODE_ENV=tunnel gulp bs

 ***********************/

import gulp from 'gulp';
import './martyr';

const production = process.env.NODE_ENV === 'production';

gulp.task('build',
  gulp.series(
    'sprite',
    gulp.parallel(
      'audio',
      'font',
      'image',
      'resize',
      'script',
      'service',
      'style',
      'svg',
      'view'
    )
  )
);

gulp.task('default',
  gulp.series(
    'del',
    'build',
    production ?
      gulp.series(
        'rev',
        'gzip',
        'zip'
      ) :
      gulp.series(
        'bs'
      )
  )
);
