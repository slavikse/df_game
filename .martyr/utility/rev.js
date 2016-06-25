import gulp from 'gulp';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import named from 'vinyl-named';
import del from 'del';

const
  name = 'rev',
  files = 'public/**/*.{html,css,js}', // где нужно заменить имена подключаемых файлов
  revFiles = [ // версионируемые файлы
    'public/**/*.{css,js}',
    'public/**/sprite.{png,svg}', // генерируемые могут измениться
    '!public/sprite*{html,css}' // генерируемые вспомогательные файлы
  ],
  there = 'public';

/**
 * Имена файлов, которые нужно удалить,
 * так как после версионирования будут
 * записаны файлы с хэшами
 * На продакшне так же будут удалены вспомогательные файлы
 */
let delFiles = [];

gulp.task('getFileNames', () => {
  return gulp.src(revFiles)
    .pipe(named(file => {
      delFiles.push(`${there}/${file.relative}`)
    }))
});

gulp.task('revFiles', () => {
  return gulp.src(revFiles)
    .pipe(rev())
    .pipe(gulp.dest(there))
    .pipe(rev.manifest())
    .pipe(gulp.dest('temp'))
});

gulp.task('replace', () => {
  return gulp.src(files)
    .pipe(revReplace({
      manifest: gulp.src('temp/rev-manifest.json')
    })).pipe(gulp.dest(there))
});

gulp.task('delFiles', () => {
  delFiles.push(
    'public/sprite.css',
    'public/sprite.png.css',
    'public/sprite.symbol.html');
  return del(delFiles)
});

/**
 * Версионируется статика: css, js и sprite.{png,svg}
 */
export default () => {
  gulp.task(name,
    gulp.series(
      'getFileNames',
      'revFiles',
      'replace',
      'delFiles'
    )
  )
}
