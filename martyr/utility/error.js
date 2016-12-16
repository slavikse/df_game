import notify from 'gulp-notify';

function error(err) {
  notify().write('error -- check console --');
  console.log(err.toString());
}

export default error;
