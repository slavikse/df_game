import gulp from 'gulp';
import named from 'vinyl-named';
import grev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import {exec} from 'child_process';

const name = 'rev';
const pathRevFiles = 'public/**/*.{html,css,js}';
const revFiles = [
  'public/**/*.*', // файлы с расширением (!CNAME)
  '!public/*.{html,txt,xml}'
];
const there = 'public';
const delFiles = [];

gulp.task(name,
  gulp.series(
    getOldFileNames,
    rev,
    replace,
    del
  )
);

/** Собирает имена файлов в массив для удаления устаревших файлов */
function getOldFileNames() {
  return gulp.src(revFiles)
  .pipe(named(file => delFiles.push(`${there}/${file.relative}`)))
}

/** Версионирует файлы и создает манифест переименований */
function rev() {
  return gulp.src(revFiles)
  .pipe(grev())
  .pipe(gulp.dest(there))
  .pipe(grev.manifest())
  .pipe(gulp.dest('temp'))
}

/** Переименовывает имена файлов согласно манифесту переименования */
function replace() {
  return gulp.src(pathRevFiles)
  .pipe(revReplace({manifest: gulp.src('temp/rev-manifest.json')}))
  .pipe(gulp.dest(there))
}

/** Удаляет устаревшие (после версионирования) файлы */
function del() {
  return exec(`rm -f ${delFiles.join(' ')}`);
}
