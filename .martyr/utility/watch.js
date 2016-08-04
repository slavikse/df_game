import gulp from 'gulp';

/**
 * Отслеживает изменения в директории и выполняет задачу
 * @param name {String} имя задачи, которая будет
 *  выполняться при изменениях в директории
 * @param files {String} отслеживаемая директория
 */
export default (name, files) => {
  gulp.task(`${name}_watch`, cb => {
    gulp.watch(files, gulp.series(name));

    cb();
  });
}
