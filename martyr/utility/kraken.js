import gulp from 'gulp';
import kraken from 'gulp-kraken';

const
  name = 'kraken',
  files = 'public/image/*',
  config = {
    key: 'c0ca8787b8d2e283a3f4dfc4e8ec8344',
    secret: '21dbaf82a2d652a5facaa690fefc9ffef6455353',
    lossy: true,
    concurrency: 6
  };

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(kraken(config))
});
