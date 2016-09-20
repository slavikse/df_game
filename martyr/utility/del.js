import gulp from 'gulp';
import del from 'del';

const
  name = 'del',
  folder = [
    'public',
    'temp'
  ];

gulp.task(name, () => {
  return del(folder);
});
