import notify from 'gulp-notify'

export default () => {
  notify({
    title: 'Ошибка',
    message: 'Прочти консоль'
  }).write(err);

  console.log(err.toString())
}
