import gulp from 'gulp';
import del from 'del';

const name = 'del';
const folder = [
  'public',
  'temp'
];

gulp.task(name, () => {
  return del(folder);
});
