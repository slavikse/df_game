import gulp from 'gulp';
import del from './tasks/del';
import font from './tasks/font';
import sprite from './tasks/sprite';
import view from './tasks/view';

import lib from './add_lib';

export default () => {
  del();
  font();
  sprite();
  view();
}
