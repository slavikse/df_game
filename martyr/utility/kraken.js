import gulp from 'gulp';
//import imagemin from 'gulp-imagemin';
import kraken from 'gulp-kraken';

const name = 'kraken';
const files = [
  'public/image/*',
  '!public/image/*.svg' // кракен удаляет ID
];

/** обновлять ключи при достижении трафика в 100мб
 * https://kraken.io/account?q=%2Faccount */
const config = {
  key: '4d5b6878ee7204d11617d89fd865bf92',
  secret: '842bb457977e415a9ae92cf24e97e30358a13de3',
  lossy: false,
  concurrency: 16
};

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(kraken(config))
});

// kraken   - 497,0 kb
// imagemin - 546,9 kb
// original - 563,7 kb

/** на случай если кракен умрет... */
//.pipe(imagemin({
//  optimizationLevel: 7,
//  progressive: true,
//  interlaced: true
//}))
//.pipe(gulp.dest('public/image'))
