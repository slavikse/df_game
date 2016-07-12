import gulp from 'gulp';
import bs from 'browser-sync';

bs.create();

const
  name = 'bs',
  folder = 'public',
  tunnel = process.env.NODE_ENV === 'tunnel';

/**
 * Следит за изменениями в директории '/public' и
 * обновляет вкладку в браузере при изменениях
 * Запустит туннель, передав в консоль: NODE_ENV=tunnel gulp bs
 */
export default () => {
  gulp.task(name, cb => {
    bs.init({
      server: folder,
      tunnel: tunnel,
      ui: false
    });

    bs.watch(folder).on('change', bs.reload);

    cb();
  })
}
