/**
 * Затирает относительную вложенность директорий
 * @param file {Object} поток vinyl fs
 * @param THERE {String} директория, куда нужно положить
 * @returns {String} нужный путь с учетом THERE
 */
export default (file, THERE) => {
  file.dirname = THERE;
  return file.basename
}
