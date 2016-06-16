import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rename from 'gulp-rename';
import responsive from 'gulp-responsive';

const
  name = 'resize',
  files = ['source/**/resize/*'],
  there = 'public/image';

/**
 * Создаем из оригинала 2 изображения меньших размеров
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files, {
      since: gulp.lastRun(name)
    }).pipe(plumber({errorHandler: notify}))
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
      })).pipe(gulp.dest(there))
  })
}
