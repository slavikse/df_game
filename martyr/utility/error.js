'use strict';

import notify from 'gulp-notify';

function error(err) {
  notify().write('ERROR! Check console');
  console.log(err.toString());
}

export default error;
