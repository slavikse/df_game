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
    'sprite', // №1
    'style', // забирает стили из спрайта изображений (№1)
    'svg',
    'view'
  )
);

if (production) {
  gulp.task('default',
    gulp.series(
      'del',
      'build',
      // 'kraken', /** включать только для выкладки. Лимит 100 Mb */
      // 'symbol', /** запускать отдельно, для оптимизации шрифтов */
      'rev',
      'gzip',
      'zip'
    )
  )
} else {
  gulp.task('default',
    gulp.series(
      'del',
      'build',
      'bs'
    )
  )
}
