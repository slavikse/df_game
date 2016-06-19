import gulp from 'gulp';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import named from 'vinyl-named';
import del from 'del';

const
  name = 'rev',
  files = 'public/**/*.{html,css,js}', // там где возможно нужно заменить имена подключаемых файлов
  revFiles = [ // версионируемые файлы
    'public/**/*.{css,js}',
    'public/**/sprite.{png,svg}', // генерируемые могут измениться, а статичные нет
    '!public/sprite*{html,css}' // генерируемые вспомогательные файлы
  ],
  there = 'public';

/**
 * Имена файлов, которые нужно удалить,
 * так как после версионирования будут
 * записаны файлы с хэшами
 */
let oldRevFiles = [];

gulp.task('getFileNames', () => {
  return gulp.src(revFiles)
    .pipe(named(file => {
      oldRevFiles.push(`${there}/${file.relative}`)
    }))
});

gulp.task('revFiles', () => {
  return gulp.src(revFiles)
    .pipe(rev())
    .pipe(gulp.dest(there))
    .pipe(rev.manifest())
    .pipe(gulp.dest('temp'))
});

gulp.task('viewFiles', () => {
  return gulp.src(files)
    .pipe(revReplace({
      manifest: gulp.src('temp/rev-manifest.json')
    }))
    .pipe(gulp.dest(there))
});

gulp.task('delOldRevFiles', () => {
  return del(oldRevFiles)
});

/**
 * Версионируется статика: css, js и sprite.{png,svg}
 */
export default () => {
  gulp.task(name,
    gulp.series(
      'getFileNames',
      'revFiles',
      'viewFiles',
      'delOldRevFiles'
    )
  )
}
