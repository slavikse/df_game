import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import svgSprite from 'gulp-svg-sprite';
import watch from '../utility/watch';

/**
 * 1. Путь для примеров использования svg спрайта
 * 2. Расположение svg спрайта
 */
const
  name = 'svg',
  files = 'source/**/svg/*',
  there = 'temp', /* 1 */
  production = process.env.NODE_ENV === 'production';

let config = {
  shape: {
    transform: []
  },
  mode: {
    symbol: {
      sprite: '../public/image/sprite.svg', /* 2 */
      dest: '',
      example: true,
      render: {
        css: true
      }
    }
  }
};

if (production) {
  config.shape.transform = ['svgo'];
  config.mode.symbol.example = false;
  config.mode.symbol.render.css = false;
  config.svg = {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

/**
 * 1. Удаляет стандартную заливку из svg, чтобы можно было ее менять через стили
 */
function createSvg() {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(rename({dirname: ''}))
  .pipe(replace(/fill=".*?"/gi, '')) /* 1 */
  .pipe(svgSprite(config))
  .pipe(gulp.dest(there))
}

/**
 * 1. Удаляет излишний путь ../public/ из примера для убодства
 * ... Придумать как удалить лишнее ...
 */
function changeExample() {
  return gulp.src('temp/sprite.symbol.*')
  .pipe(replace(/\.\.\/public\//gi, '')) /* 1 */
  .pipe(gulp.dest(there))
}

gulp.task(name,
  gulp.series(
    createSvg,
    changeExample
  )
);

if (!production) {
  watch(name, files);
}
