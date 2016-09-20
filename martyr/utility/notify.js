import notify from 'gulp-notify';

export default err => {
  notify().write(err);
  console.log(err.toString());
}
