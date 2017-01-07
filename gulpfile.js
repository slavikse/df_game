'use strict';

const gulp = require('gulp');

require('./martyr/build/audio');
require('./martyr/build/audios');
require('./martyr/build/font');
require('./martyr/build/image');
require('./martyr/build/resize');
require('./martyr/build/script');
require('./martyr/build/service');
require('./martyr/build/sprite');
require('./martyr/build/style');
require('./martyr/build/svg');
require('./martyr/build/view');

require('./martyr/utility/bs');
require('./martyr/utility/gzip');
require('./martyr/utility/kraken');
require('./martyr/utility/rev');
require('./martyr/utility/symbol'); // выводит используемые глифы (*.html)
require('./martyr/utility/zip');

const production = process.env.NODE_ENV === 'production';
const buildTasks = [
  'audio',
  'audios', // #1
  'font',
  'image',
  'resize',
  'service',
  'sprite', // #2
  'svg',
  'view',
  'style', // собирает css из спрайта изображений (#2)
  'script' // собирает json из аудио спрайта (#1)
];
const productionTasks = [
  'build',
  'kraken',
  'rev',
  'gzip',
  'zip'
];
const developmentTasks = [
  'build',
  'bs'
];

gulp.task('build', gulp.series(...buildTasks));

if (production) {
  gulp.task('default', gulp.series(...productionTasks));
} else {
  gulp.task('default', gulp.series(...developmentTasks));
}
