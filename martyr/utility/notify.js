import notify from 'gulp-notify';

/**
 * Сообщает во всплывашке в OS об ошибке
 */
export default err => {
  notify().write(err);
  console.log(err.toString());
}
