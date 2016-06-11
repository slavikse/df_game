import gulp from 'gulp'
import notify from '../utility/notify'
import watch from '../utility/watch'
import $ from 'gulp-load-plugins'

const
  NAME = 'resize',
  FILES = [
    'source/**/resize/*',
    '!source/**/{_*,_*/**}'
  ],
  THERE = 'public/image';

export default () => {
  watch(NAME, wFILES);

  gulp.task(NAME, () => {
    return gulp.task(NAME, () => {
      gulp.src(FILES)
        .pipe(gulp.dest(THERE))
    })
  })
}
