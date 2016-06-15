import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  name = 'svg',
  files = [
    'source/**/svg/*',
    '!source/**/{_*/**,_*}'
  ],
  there = 'public/svg',

  config = {
    mode: {
      symbol: {
        sprite: 'sprite.svg',
        example: false,
        dest: '',
        render: {
          css: true
        }
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  };

/**
 * Создаем спрайт из svg и стили использвоания
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

//TODO svgo
