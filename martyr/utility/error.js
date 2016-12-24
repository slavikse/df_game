import notify from 'gulp-notify';

function error(err) {
  notify().write('-- Ошибка в console --');
  console.log(err.toString());
}

export default error;
