import gulp from 'gulp'
import notify from '../utility/notify'
import watch from '../utility/watch'
import $ from 'gulp-load-plugins'

const
  NAME = 'view',
  FILES = [
    'source/*.html',
    '!source/_*'
  ],
  wFILES = [
    'source/**/*.html',
    '!source/**/{_*,_*/**}'
  ],
  THERE = 'public';

export default () => {
  watch(NAME, wFILES);

  gulp.task(NAME, () => {
    return gulp.task(NAME, () => {
      gulp.src(FILES)
        .pipe(gulp.dest(THERE))
    })
  })
}
