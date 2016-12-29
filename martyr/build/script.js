import gulp from 'gulp';
import plumber from 'gulp-plumber';
import error from './../utility/error';
import named from 'vinyl-named';
import wpStream from 'webpack-stream';
import webpack from 'webpack';
import StatsPlugin from 'stats-webpack-plugin';

const name = 'script';
const files = 'source/*.js';
const there = 'public';
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
    rules: [
      {
        test: /\.js$/,
        exclude: /firebase/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  cache: true,
  watch: !production,
  watchOptions: {aggregateTimeout: 20},
  devtool: production ? false : 'eval',
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: 2
    // })
  ]
};

// dev
if (!production) {
  options.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new StatsPlugin('stats.json', {chunkModules: true})
  )
}

// prod
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
        dead_code: true,
        drop_console: true,
        unsafe: true // безопасно???
      }
    })
  )
}

gulp.task(name, cb => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(named())
  .pipe(wpStream(options, webpack, done))
  .pipe(gulp.dest(there))
  .on('data', buildReady.bind(null, cb))
});
