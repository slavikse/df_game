import gulp from 'gulp';
import bs from 'browser-sync';

bs.create();

const
  name = 'bs',
  folder = ['public'],
  tunnel = process.env.NODE_ENV === 'tunnel';

/**
 * Следит за изменениями в директории '/public' и
 * обновляет браузер при изменениях.
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
