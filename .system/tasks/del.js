import gulp from 'gulp';
import del from 'del';

const
  NAME = 'del',
  FILES = [
    'public',
    'temp'
  ];

/**
 * Удалает собранную и временную папки
 */
export default () => {
  gulp.task(NAME, () => {
    return del(FILES)
  })
}
