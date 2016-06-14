import del from './tasks/del';
import font from './tasks/font';
import image from './tasks/image';
import lazyLib from './tasks/lazy_lib';
import resize from './tasks/resize';
import script from './tasks/script';
import scriptLib from './tasks/script_lib';
import serviceClient from './tasks/service_client';
import sprite from './tasks/sprite';
import style from './tasks/style';
import slyteLib from './tasks/style_lib';
import svg from './tasks/svg';
import view from './tasks/view';

export default () => {
  del();
  font();
  image();
  lazyLib();
  resize();
  script();
  serviceClient();
  sprite();
  style();
  slyteLib();
  svg();
  view();
}
