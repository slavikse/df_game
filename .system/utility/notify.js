import notify from 'gulp-notify';

/**
 * Сообщает во всплывашке в OS об ошибке
 */
export default () => {
  notify({
    title: 'Ошибка',
    message: 'Прочти консоль'
  }).write(err);

  console.log(err.toString())
}
