import gulp from 'gulp';
import bs from 'browser-sync';

bs.create();

const
  tunnel = process.env.NODE_ENV === 'tunnel',
  name = 'bs',
  folder = ['public'];

/**
 * Следит за изменениями в директории '/public' и
 * обновляет вкладку в браузере при изменениях.
 * Передав в консоль: NODE_ENV=tunnel gulp bs, запустит внешний туннель
 */
export default () => {
  gulp.task(name, () => {
    bs.init({
      server: folder,
      tunnel: tunnel,
      ui: false
    });

    return bs.watch(folder)
      .on('change', bs.reload)
  })
}
