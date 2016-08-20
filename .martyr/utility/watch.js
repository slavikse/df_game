import gulp from 'gulp';

/**
 * Отслеживает изменения в директории и выполняет задачу
 * @param name {String} имя задачи, которая будет
 *  выполняться при изменениях в директории
 * @param files {Array} отслеживаемые директории
 */
export default (name, files) => {
  gulp.task(`${name} watch`, cb => {
    gulp.watch(files, gulp.series(name));

    cb();
  });
}
