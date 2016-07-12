import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import named from 'vinyl-named';
import webpackStream from 'webpack-stream';

let firstBuildReady = false;

const
  name = 'script',
  files = 'source/*.js',
  there = 'public',
  production = process.env.NODE_ENV === 'production',

  webpack = webpackStream.webpack,

  /**
   * Сигнализирует о завершении первой сборки,
   * чтобы gulp смог продолжить выполнение.
   * webpack продолжит отслеживать файлы.
   * @type {Object} ошибка при сборке, обрабатывает gulp
   */
  done = err => {
    firstBuildReady = true;

    if (err) {
      return null;
    }
  },

  options = {
    module: {
      loaders: [{
        loader: 'babel'
      }]
    },
    watch: !production,
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
      })
    ],
    devtool: production ? null : 'cheap-inline-module-source-map'
  };

if (production) {
  options.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

/**
 * Собирает скрипты es2015 & React с webpack и babel
 * Сжимает на продакшн
 */
export default () => {
  gulp.task(name, cb => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(named())
      .pipe(webpackStream(options, null, done))
      .pipe(gulp.dest(there))
      .on('data', () => {
        if (firstBuildReady) {
          cb()
        }
      })
  })
}
