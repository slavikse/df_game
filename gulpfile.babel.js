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

const production = process.env.NODE_ENV === 'production';

gulp.task('build',
  gulp.parallel(
    'font',
    'image',
    'resize',
    'script',
    'service',
    'sprite',
    'style',
    'svg',
    'view'
  )
);

gulp.task('watch', // за script - следит webpack
  gulp.parallel(
    'font_watch',
    'image_watch',
    'resize_watch',
    'service_watch',
    'sprite_watch',
    'style_watch',
    'svg_watch',
    'view_watch'
  )
);

gulp.task('default',
  production ?
    // production
    gulp.series(
      'del',
      'build',
      'rev',
      gulp.parallel(
        'size',
        'zip'
      )
    ) :
    // development
    gulp.series(
      'del',
      'build',
      gulp.parallel(
        'watch',
        'bs'
      )
    )
);
