import gulp from 'gulp';
import zip from 'gulp-zip';

const
  name = 'zip',
  folder = 'public/**',
  there = 'zip',
  time = new Date().toLocaleString('ru');

/**
 * Запакует файлы после сборки в zip
 * Имени архива присваивает текущее время
 */
gulp.task(name, () => {
  return gulp.src(folder)
    .pipe(zip(`${time}.zip`))
    .pipe(gulp.dest(there));
});
