import gulp from 'gulp';
import bs from 'browser-sync';

bs.create();

const
  name = 'bs',
  folder = 'public',
  tunnel = process.env.NODE_ENV === 'tunnel';

/**
 * Запустит туннель, передав в консоль: NODE_ENV=tunnel gulp bs
 */
gulp.task(name, cb => {
  bs.init({
    server: folder,
    tunnel: tunnel,
    ui: false
  });

  bs.watch(folder)
  .on('change', bs.reload);

  cb();
});
