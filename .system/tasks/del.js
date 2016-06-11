import gulp from 'gulp'
import del from 'del'

const
  NAME = 'del',
  FILES = [
    'public',
    'temp'
  ];

export default () => {
  gulp.task(NAME, () => {
    return del(FILES)
  })
}
