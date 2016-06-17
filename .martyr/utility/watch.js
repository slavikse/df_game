import gulp from 'gulp';

/**
 * Отслеживает изменения в директориях для задачи
 * @param name {String} имя задачи, которая будет
 *  выполняться при изменениях в директориях
 * @param files {Array} отслеживаемые директории
 */
export default (name, files) => {
  gulp.task(`${name}_watch`, cb => {
    gulp.watch(files,
      gulp.series(name)
    );

    cb()
  })
}
