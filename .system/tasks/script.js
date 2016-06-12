import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import watch from '../utility/watch';
import notify from '../utility/notify';

const
  name = 'script',
  files = [
    'source/*.js',
    '!source/_*'
  ],
  wFiles = [
    'source/**/*.js',
    '!source/**/{lib/**,lazy/**,_*/**,_*,server/**}'
  ],
  there = 'public',

  production = process.env.NODE_ENV === 'production',
  webpack = webpackStream.webpack,
  options = {
    devtool: production ? null : 'cheap-inline-module-source-map',
    module: {
      loaders: [{
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
  };

/**
 * Собираем скрипты с webpack
 */
export default () => {
  watch(name, wFiles);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(named())
      .pipe(webpackStream(options))
      .pipe(gulp.dest(there))
  })
}
