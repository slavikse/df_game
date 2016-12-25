import gulp from 'gulp';
import kraken from 'gulp-kraken';
import util from 'gulp-util';

const name = 'kraken';
const files = [
  'public/image/*',
  '!public/image/*.svg' // чтобы не удалял ID
];
const production = process.env.NODE_ENV === 'production';
/** обновлять ключи при достижении трафика в 100мб
 * https://kraken.io/account?q=%2Faccount */
const config = {
  key: '82af123e95800fc29b6f30f7f8f6832c',
  secret: 'c1bd01c6cf05160ad179eae976babdeaa571ffaf'
};

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(production ? kraken(config) : util.noop())
});
