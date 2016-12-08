import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import named from 'vinyl-named';
import webpackStream from 'webpack-stream';

const name = 'script';
const files = 'source/*.js';
const there = 'public';
const webpack = webpackStream.webpack;
const production = process.env.NODE_ENV === 'production';

let firstBuildReady = false;

/**
 * Сигнализирует о завершении первой сборки,
 * чтобы gulp смог продолжить выполнение
 * @type {Object} ошибку обрабатывает gulp
 */
function done(error) {
  firstBuildReady = true;

  if (error) {
    return null;
  }
}

function buildReady(cb) {
  if (firstBuildReady) {
    cb();
  }
}

const options = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /firebase/,
        cacheDirectory: true,
        loader: 'babel'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  watch: !production,
  watchOptions: {aggregateTimeout: 100},
  devtool: production ? null : 'cheap-eval-source-map',
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: 2
    // })
  ]
};

if (!production) {
  options.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
}

if (production) {
  options.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        // drop_console: true,
        unsafe: true
      }
    })
  )
}

gulp.task(name, cb => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify.onError(name)}))
  .pipe(named())
  .pipe(webpackStream(options, null, done))
  .pipe(gulp.dest(there))
  .on('data', buildReady.bind(null, cb))
});
