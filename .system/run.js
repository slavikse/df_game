import del from './tasks/del';
import font from './tasks/font';
import sprite from './tasks/sprite';
import view from './tasks/view';
import lazyLib from './tasks/lazy_lib';

export default () => {
  del();
  font();
  sprite();
  view();
  lazyLib();
}
