import gulp from 'gulp';
import penthouse from 'penthouse';
import inject from 'gulp-inject-string';

const name = 'critical';
const htmlFiles = [
  'public/index.html',
  'public/404.html'
];
const cssFiles = [
  'public/index.css'
];
const there = 'public';

/**
 * Актуально только для большого количества экранов
 * Вписывает критический css первого экрана в конец head
 */
gulp.task(name, cb => {
  penthouse({
    url: htmlFiles,
    css: cssFiles,
    width: 1200,
    height: 800
  }, critical => {
    gulp.src(htmlFiles)
    .pipe(inject.before(
      '</head>',
      `\n<style>\n${critical ? critical : ''}\n</style>\n`))
    .pipe(gulp.dest(there))
    .on('end', cb)
  })
});

/*TODO выстрегать критический из основного файла стилей
 сравнивая текст в critical с текстом в cssFiles*/
