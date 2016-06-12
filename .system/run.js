import del from './tasks/del';
import font from './tasks/font';
import image from './tasks/image';
import lazyLib from './tasks/lazy_lib';
import resize from './tasks/resize';
import sprite from './tasks/sprite';
import style from './tasks/style';
import svg from './tasks/svg';
import view from './tasks/view';

export default () => {
  del();
  font();
  image();
  lazyLib();
  resize();
  sprite();
  style();
  svg();
  view();
}
