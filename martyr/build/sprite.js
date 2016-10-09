import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import responsive from 'gulp-responsive';
import util from 'gulp-util';

const
  name = 'sprite',
  files = 'source/**/sprite/*',
  thereImage = 'public',
  thereStyle = 'temp',
  production = process.env.NODE_ENV === 'production',
  config = {
    '*': [{
      width: '100%'
    }]
  },
  params = {
    quality: 80,
    progressive: true,
    compressionLevel: 6,
    stats: false,
    silent: true,
    errorOnEnlargement: false,
    errorOnUnusedConfig: false,
    withoutEnlargement: false
  };

let spriteData;

gulp.task(name,
  gulp.series(
    spriteCreate,
    imageStream,
    styleStream
  )
);

function spriteCreate(cb) {
  spriteData = gulp.src(files)
  .pipe(spritesmith({
    imgName: 'image/sprite.png',
    cssName: 'sprite.png.css'
  }));

  cb();
}

function imageStream() {
  return spriteData.img
  .pipe(buffer())
  .pipe(production ? responsive(config, params) : util.noop())
  .pipe(gulp.dest(thereImage));
}

function styleStream() {
  return spriteData.css
  .pipe(gulp.dest(thereStyle));
}

if (!production) {
  gulp.watch(files, gulp.series(name));
}
