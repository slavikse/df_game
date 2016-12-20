import gulp from 'gulp';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import svgSprite from 'gulp-svg-sprite';

/** 1. Расположение svg спрайта */
const name = 'svg';
const files = 'source/**/svg/*';
const there = 'temp';
const production = process.env.NODE_ENV === 'production';
const config = {
  shape: {
    transform: []
  },
  mode: {
    symbol: {
      sprite: '../public/image/sprite.svg', /* 1 */
      dest: '',
      example: true,
      render: {css: true}
    }
  }
};

if (production) {
  config.shape.transform = 'svgo';
  config.mode.symbol.example = false;
  config.mode.symbol.render.css = false;
  config.svg = {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

gulp.task(name,
  gulp.series(
    createSvg,
    changeExample
  )
);

function createSvg() {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(svgSprite(config))
  .pipe(gulp.dest(there))
}

/** 1. Удаляет лишний путь ../public/ из примера */
function changeExample() {
  return gulp.src('temp/sprite.symbol.*') // на проде его нет, поэтому .*
  .pipe(replace(/\.\.\/public\//gi, '')) /* 1 */
  .pipe(gulp.dest(there))
}

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}
