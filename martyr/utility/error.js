'use strict';

const notify = require('gulp-notify');

function error(err) {
  notify().write('ERROR! Check console');
  console.log(err.toString());
}

module.exports.error = error;
