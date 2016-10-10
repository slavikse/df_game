/* ***** КОМАНДЫ ***** *\

Сборка на продакшн:
NODE_ENV=production gulp

Запустить туннель:
NODE_ENV=tunnel gulp bs

***********************/

import gulp from 'gulp';
import './martyr';

const production = process.env.NODE_ENV === 'production';

gulp.task('build',
  gulp.series(
    'audio',
    'audio_sprite',
    'font',
    'image',
    'resize',
    'script',
    'service',
    'sprite', // зависит: style - подхватывает стили
    'style',
    'svg',
    'view'
  )
);

gulp.task('default',
  gulp.series(
    'del',
    'build',
    production ?
      gulp.series(
        'symbol',
        'rev',
        'gzip',
        'zip'
      ) :
      gulp.series(
        'bs'
      )
  )
);
