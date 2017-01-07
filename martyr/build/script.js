'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const error = require('./../utility/error');
const named = require('vinyl-named');
const wpStream = require('webpack-stream');
const webpack = require('webpack');
//const StatsPlugin = require('stats-webpack-plugin');

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
    rules: [{
      test: /\.js$/,
      exclude: /firebase/,
      loader: 'babel-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    modules: ['source', 'node_modules'],
    extensions: ['.js', '.json']
  },
  cache: true,
  watch: !production,
  watchOptions: {aggregateTimeout: 100},
  devtool: production ? false : 'eval',
  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      //name: 'common',
      //minChunks: 2
    })
  ]
};

if (production) {
  options.plugins.push(
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
  options.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
    //new StatsPlugin('stats.json', {chunkModules: true})
  )
}

gulp.task(name, function (cb) {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(named())
  .pipe(wpStream(options, webpack, done))
  .pipe(gulp.dest(there))
  .on('data', buildReady.bind(null, cb))
});
