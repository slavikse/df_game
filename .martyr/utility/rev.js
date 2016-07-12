import gulp from 'gulp';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import named from 'vinyl-named';
import del from 'del';

const
  name = 'rev',
  files = 'public/**/*.{html,css,js}', // заменит подключаемые файлы на версионируемые
  revFiles = [ // версионируемые файлы
    'public/**/*.{css,js}',
    'public/**/sprite.{png,svg}', // генерируемые картинки (спрайты)
    '!public/sprite*{html,css}' // подсказки использования спрайтов
  ],
  there = 'public',
  production = process.env.NODE_ENV === 'production';

/**
 * Имена файлов, которые нужно удалить, так как после версионирования будут записаны новые файлы с хэшами
 * Удаляет картинки нужные только для багфикса к плагину: gulp-responsive
 */
let delFiles = [
  'public/image/bugfix.png',
  'public/image/bugfix_mobile.png',
  'public/image/bugfix_tablet.png'
];

/**
 * Собирает имена файлов в массив для удаления устаревших файлов
 */
gulp.task('getFileNames', () => {
  return gulp.src(revFiles)
    .pipe(named(file => {
      delFiles.push(`${there}/${file.relative}`)
    }))
});

/**
 * Версионирует файлы и создает манифест переименования
 */
gulp.task('revFiles', () => {
  return gulp.src(revFiles)
    .pipe(rev())
    .pipe(gulp.dest(there))
    .pipe(rev.manifest())
    .pipe(gulp.dest('temp'))
});

/**
 * Переименовывает имена файлов согласно манифесту переименования
 */
gulp.task('replace', () => {
  return gulp.src(files)
    .pipe(revReplace({manifest: gulp.src('temp/rev-manifest.json')}))
    .pipe(gulp.dest(there))
});

/**
 * Удаляет устаревшие (после версионирования) файлы
 * На продакшн так же: подсказки использования спрайтов
 */
gulp.task('delFiles', () => {
  if (production) {
    delFiles.push(
      'public/sprite.css',
      'public/sprite.png.css',
      'public/sprite.symbol.html'
    )
  }
  
  return del(delFiles);
});

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
