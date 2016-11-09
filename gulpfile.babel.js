/* ***** КОМАНДЫ ***** *\

Запустить туннель:
NODE_ENV=tunnel gulp bs

Сборка на продакшн:
NODE_ENV=production gulp

***********************/

import gulp from 'gulp';
import './martyr';

const production = process.env.NODE_ENV === 'production';

gulp.task('build',
  gulp.series(
    'audio',
    'audio_sprite', // #1
    'font',
    'image',
    'resize',
    'service',
    'sprite', // #2
    'svg',
    'view',
    'script', // собирает json из аудио спрайта (#1)
    'style' // собирает css из спрайта изображений (#2)
  )
);

if (production) {
  gulp.task('default',
    gulp.series(
      'del',
      'build',
      //'kraken', /** включать только для выкладки (хорошо жмет спрайт). Лимит 100 Mb */
      //'symbol', /** уникальные символы в текстах в html файлах, для вырезания из шрифта лишнего */
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
