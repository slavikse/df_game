'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

const name = 'symbol';
const files = 'public/*.html';
const options = {
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true, /* 1 */
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  preventAttributesEscaping: true,
  removeRedundantAttributes: true, /* 2 */
  sortAttributes: true,
  sortClassName: true
};

let words = [];
let filterWords = [];
let symbols = [];

gulp.task(name,
  gulp.series(
    word,
    symbol
  )
);

/** собирает слова в html файлах */
function word() {
  return gulp.src(files)
  .pipe(htmlmin(options))
  .on('data', file => {
    words = String(file.contents).match(/>(.*?)</g);

    words.forEach(word => {
      filterWords.push(word
        .replace(/[><]/g, '')
        .replace('&#32;', '')
      )
    });

    filterWords = filterWords.filter(word => {
      if (word === '') {
        return false;
      }

      return true;
    });

    filterWords.splice(0, 1); // убирает текст в title
  });
}

/** собирает уникальные символы */
function symbol(cb) {
  filterWords.forEach(word => {
    for (let i = 0, len = word.length; i < len; i++) {
      const symbol = word[i];

      if (symbol !== ' ') {
        symbols.push(symbol);
      }
    }
  });

  symbols = uniqueArray(symbols).sort();
  console.log(...symbols);

  cb();
}

function uniqueArray(array) {
  return array.filter((item, pos, self) => self.indexOf(item) === pos);
}
