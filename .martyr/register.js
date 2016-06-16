import bs from './tasks/bs';
import del from './tasks/del';
import font from './tasks/font';
import image from './tasks/image';
import resize from './tasks/resize';
import script from './tasks/script';
import service from './tasks/service';
import sprite from './tasks/sprite';
import style from './tasks/style';
import svg from './tasks/svg';
import view from './tasks/view';
import zip from './tasks/zip';

/**
 * Регистрируем все задачи
 */
export default () => {
  bs();
  del();
  font();
  image();
  resize();
  script();
  service();
  sprite();
  style();
  svg();
  view();
  zip();
}
