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
import './martyr/build/svg';
import './martyr/build/view';

import './martyr/utility/bs';
import './martyr/utility/critical'; // дописывать пути: .html и .css
import './martyr/utility/del';
import './martyr/utility/gzip';
import './martyr/utility/kraken';
import './martyr/utility/rev';
import './martyr/utility/zip';

const production = process.env.NODE_ENV === 'production';
const buildTasks = [
  'audio',
  'audio_sprite', // #1
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
  'del',
  'build',
  'kraken', // лимит 100 Mb
  'rev',
  'gzip',
  'zip'
];
const developmentTasks = [
  'del',
  'build',
  'bs'
];

gulp.task('build', gulp.series(...buildTasks));

if (production) {
  gulp.task('default', gulp.series(...productionTasks));
} else {
  gulp.task('default', gulp.series(...developmentTasks));
}
