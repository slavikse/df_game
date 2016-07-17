import gulp from 'gulp';
import del from 'del';

const
  name = 'del',
  folder = [
    'public',
    'temp'
  ];

/**
 * Удалает собранную и временную папки
 */
gulp.task(name, () => {
  return del(folder);
});
