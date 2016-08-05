import gulp from 'gulp';
import rename from 'gulp-rename';
import responsive from 'gulp-responsive';
import imagemin from 'gulp-imagemin';
import util from 'gulp-util';
import watch from '../utility/watch';

const
  name = 'resize',
  files = 'source/**/resize/*',
  there = 'public/image',
  production = process.env.NODE_ENV === 'production';

/**
 * Создает из оригинала 2 изображения меньших размеров
 * Сжимает на продакшн
 */
gulp.task(name, () => {
  return gulp.src(files, {since: gulp.lastRun(name)})
  .pipe(rename({dirname: ''}))
  .pipe(responsive({
    '*': [{
      width: '100%' // lg 1200px
    }, {
      width: '70%', // md 992px
      rename: {
        suffix: '_tablet'
      }
    }, {
      width: '40%', // xs 544px
      rename: {
        suffix: '_mobile'
      }
    }]
  }, {
    stats: false,
    silent: true
  }))
  .pipe(production ? imagemin({progressive: true}) : util.noop())
  .pipe(gulp.dest(there));
});

if (!production) {
  watch(name, files);
}
