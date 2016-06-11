import gulp from 'gulp'
import rebase from '../utility/rebase'
import watch from '../utility/watch'

const
  NAME = 'font',
  FILES = [
    'source/**/font/*',
    '!source/**/{_*,_*/**}'
  ],
  THERE = 'public/font';

export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, () => {
    return gulp.src(FILES, {
      since: gulp.lastRun(NAME)
    }).pipe(gulp.dest(
      (file) => rebase(file, THERE)
    ))
  })
}
