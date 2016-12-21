import gulp from 'gulp';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import svgSprite from 'gulp-svg-sprite';
import fs from 'fs';

/** 1. Расположение svg спрайта */
const name = 'svg';
const files = 'source/**/svg/*';
const there = 'temp';
const production = process.env.NODE_ENV === 'production';
const config = {
  shape: {transform: []},
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
    changeExample,
    cutString
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
  return gulp.src('temp/sprite.symbol.*') // (html) на проде его нет, поэтому *
  .pipe(replace(/\.\.\/public\//gmi, '')) /* 1 */
  .pipe(gulp.dest(there))
}

// оставляет только нужные подсказки к спрайту
function cutString(cb) {
  const spritePath = 'temp/sprite.symbol.html';

  if (fs.existsSync(spritePath)) {
    const spriteString = fs.readFileSync(spritePath).toString();
    const start = spriteString.indexOf('<h3>B)');
    const startDeep = spriteString.indexOf('<svg', start);
    const end = spriteString.indexOf('</div>', startDeep);
    const newSpriteString = spriteString.slice(startDeep, end);

    fs.writeFileSync(spritePath, newSpriteString);
  }

  cb();
}

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}
