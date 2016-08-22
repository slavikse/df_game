/* ***** КОМАНДЫ ***** *\
 Запушить изменения:
 git push -u origin master

 Сборка на продакшн:
 NODE_ENV=production gulp

 Запустить туннель:
 NODE_ENV=tunnel gulp
 ************************/

import gulp from 'gulp';
import './martyr';

const production = process.env.NODE_ENV === 'production';

gulp.task('build',
  gulp.series(
    'service',
    'font',
    'view',
    'style',
    'script',
    'sprite',
    'svg',
    'image',
    'resize'
  )
);

if (!production) {
  gulp.task('watch',
    gulp.parallel(
      'service watch',
      'font watch',
      'view watch',
      'style watch',
      // script watch -> webpack
      'svg watch',
      'sprite watch',
      'image watch',
      'resize watch'
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
