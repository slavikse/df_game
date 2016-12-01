import gulp from 'gulp';
import bs from 'browser-sync';

const name = 'bs';
const folder = 'public';
const tunnel = process.env.NODE_ENV === 'tunnel';

bs.create();

gulp.task(name, cb => {
  bs.init({
    server: folder,
    tunnel: tunnel,
    ui: false
  });

  if (!tunnel) {
    bs.watch(folder)
    .on('change', bs.reload);
  }

  cb();
});
