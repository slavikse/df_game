import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import responsive from 'gulp-responsive';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  NAME = 'resize',
  FILES = [
    'source/**/resize/*',
    '!source/**/{_*/**,_*}'
  ],
  THERE = 'public/image';

/**
 * Создаем из оригинала 2 изображения меньших размеров
 */
export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, () => {
    return gulp.src(FILES, {
      since: gulp.lastRun(NAME),
      allowEmpty: true
    })
      .pipe(plumber({errorHandler: notify}))
      .pipe(rename({dirname: ''}))
      .pipe(responsive({
        '*': [
          {
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
          }
        ]
      }, {
        stats: false,
        silent: true
      })).pipe(gulp.dest(THERE))
  })
}
