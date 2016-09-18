/* ***** КОМАНДЫ ***** *\
 Запушить изменения:
 git push -u origin master

 Сборка на продакшн:
 NODE_ENV=production gulp

 Запустить дев туннель:
 NODE_ENV=tunnel gulp

 Запустить туннель:
 NODE_ENV=tunnel gulp bs

 Сборка на продакшн и туннель:
 NODE_ENV=production gulp && NODE_ENV=tunnel gulp bs
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

if (!production) {
  gulp.task('watch',
    gulp.parallel(
      'audio watch',
      'font watch',
      'image watch',
      'resize watch',
      // script watch -> webpack
      'service watch',
      'sprite watch',
      'style watch',
      'svg watch',
      'view watch'
    )
  )
}

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
      gulp.parallel(
        'watch',
        'bs'
      )
  )
);
