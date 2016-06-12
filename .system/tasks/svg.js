import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';
import watch from '../utility/watch';
import notify from '../utility/notify';

const
  name = 'svg',
  files = [
    'source/**/svg/*',
    '!source/**/{_*/**,_*,server/**}'
  ],
  there = 'public/svg',
  config = {
    mode: {
      symbol: {
        sprite: 'sprite.svg',
        dest: ''
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  };

/**
 * Создаем спрайт из svg
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(rename({dirname: ''}))
      .pipe(svgSprite(config))
      .pipe(gulp.dest(there))
  })
}
