/******** КОМАНДЫ **********
 *
 * Запустить туннель:
 * NODE_ENV=tunnel gulp bs
 *
 * Сборка на продакшн:
 * NODE_ENV=production gulp
 *
 ***************************/

import gulp from 'gulp';

import './martyr/build/audio';
import './martyr/build/audio_sprite';
import './martyr/build/font';
import './martyr/build/image';
import './martyr/build/resize';
import './martyr/build/script';
import './martyr/build/service';
import './martyr/build/sprite';
import './martyr/build/style';
//import './martyr/build/svg';
import './martyr/build/view';

import './martyr/utility/bs';
import './martyr/utility/gzip';
import './martyr/utility/kraken';
import './martyr/utility/rev';
//import './martyr/utility/symbol';
import './martyr/utility/zip';

const isProduction = process.env.NODE_ENV === 'production';

gulp.task('build',
  gulp.series(
    'audio',
    'audio_sprite', // #1
    'font',
    'image',
    'resize',
    'service',
    'sprite', // #2
    //'svg',
    'view',
    'script', // собирает json из аудио спрайта (#1)
    'style' // собирает css из спрайта изображений (#2)
  )
);

if (isProduction) {
  production();
} else {
  develop();
}

function production() {
  gulp.task('default',
    gulp.series(
      'build',
      //'kraken', /** включать только для выкладки. Лимит 100 Mb */
      //'symbol', /** уникальные символы в текстах в html файлах */
      'rev',
      'gzip',
      'zip'
    )
  )
}

function develop() {
  gulp.task('default',
    gulp.series(
      'build',
      'bs'
    )
  )
}
