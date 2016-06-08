const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/source`,

  entry: './app',

  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'app.js'
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  // resolve: {
  //   root: `${__dirname}/source`,
  //   alias: {
  //    // name: path
  //   }
  // },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
