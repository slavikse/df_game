'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import svgSprite from 'gulp-svg-sprite';
import fs from 'fs';
import cheerio from 'cheerio';

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
    cleanSvgHelper
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
function cleanSvgHelper(cb) {
  const spritePath = 'temp/sprite.symbol.html';

  if (fs.existsSync(spritePath)) {
    const spriteString = fs.readFileSync(spritePath).toString();
    const svgBlock = extractSvg(spriteString);

    fs.writeFileSync(spritePath, svgBlock);
  }

  cb();
}

function extractSvg(spriteString) {
  const $ = cheerio.load(spriteString);
  const svgBlock = [];

  // нужный svg содержится во втором блоке section внутри .icon-box
  $('section').next().find('.icon-box').each((i, elem) => {
    svgBlock.push($(elem).html());
  });

  return svgBlock;
}

if (!production) {
  gulp.watch(files, gulp.series(name));
}
