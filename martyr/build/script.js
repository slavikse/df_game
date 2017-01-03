import gulp from 'gulp';
import plumber from 'gulp-plumber';
import error from './../utility/error';
import named from 'vinyl-named';
import wpStream from 'webpack-stream';
import webpack from 'webpack';
//import StatsPlugin from 'stats-webpack-plugin';

const name = 'script';
const files = 'source/*.js';
const there = 'public';
const production = process.env.NODE_ENV === 'production';
const module = {
  rules: [{
    test: /\.js$/,
    exclude: /firebase/,
    loader: 'babel-loader'
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }]
};
const resolve = {
  modules: ['source', 'node_modules'],
  extensions: ['.js', '.json']
};
const plugins = [
  new webpack.EnvironmentPlugin('NODE_ENV'),
  new webpack.optimize.CommonsChunkPlugin({
    children: true,
    async: true,
    //name: 'common',
    //minChunks: 2
  })
];

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

if (production) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      output: {comments: false},
      compress: {
        properties: true,
        dead_code: true,
        unsafe: true, // безопасно ???
        conditionals: true,
        //unsafe_comps: true,
        //comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        collapse_vars: true,
        reduce_vars: true,
        warnings: false,
        negate_iife: true,
        sequences: true,
        drop_console: true
      }
    })
  )
} else {
  plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new StatsPlugin('stats.json', {chunkModules: true})
  )
}

const options = {
  module: module,
  resolve: resolve,
  cache: true,
  watch: !production,
  watchOptions: {aggregateTimeout: 50},
  devtool: production ? false : 'eval',
  plugins: plugins
};

gulp.task(name, cb => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(named())
  .pipe(wpStream(options, webpack, done))
  .pipe(gulp.dest(there))
  .on('data', buildReady.bind(null, cb))
});
