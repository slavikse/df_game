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
  webpack = webpackStream.webpack,
  production = process.env.NODE_ENV === 'production',

  /**
   * Сигнализирует о завершении первой сборки,
   * чтобы gulp смог продолжить выполнение
   * @type {Object} ошибку обрабатывает gulp
   */
  done = err => {
    firstBuildReady = true;

    if (err) {
      return null;
    }
  },

  options = {
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel'},
        {test: /\.json$/, loader: 'json'}
      ]
    },
    watch: !production,
    watchOptions: {
      aggregateTimeout: 30
    },
    devtool: production ? null : 'cheap-eval-source-map',
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin([
        "NODE_ENV"
      ]),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'common',
      //   minChunks: 2
      // })
    ]
  };

if (production) {
  options.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  )
}

gulp.task(name, cb => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(named())
  .pipe(webpackStream(options, null, done))
  .pipe(gulp.dest(there))
  .on('data', () => {
    if (firstBuildReady) {
      cb();
    }
  })
});
