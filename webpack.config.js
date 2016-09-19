var path = require('path');
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV || process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const METADATA = {
  host: HOST,
  port: PORT,
  ENV: ENV
};

module.exports = {
  metadata: METADATA,

  entry: [
    './src/polyfills.browser',
    './src/main.browser'
  ],
  output: {
    path: path.resolve('www/dist/'),
    filename: 'app.bundle.js',
    pathinfo: true, // show module paths in the bundle, handy for debugging
    publicPath: 'dist/'
  },
  module: {
    loaders: [
      { test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-hot!elm-webpack?verbose=true&warn=true' },
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.png$/, loader: 'url?limit=100000' },
      {
        test: /\.woff(2)?(\?v=.+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=[hash].[ext]"
      },
      // { test: /\.woff(2)?(\?v=.+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=.+)?$/, loader: 'file' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.json$/, loader: 'json' }
    ],
    noParse: [
      /reflect-metadata/,
    ]
  },
  resolve: {
    // NOTE: this syntax is for webpack2
    modules: [
      path.join(__dirname, 'www', 'app'),
      "node_modules"
    ],
    extensions: ["", ".js", ".ts", ".json", ".elm"]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "./node_modules/ionic-angular/"),
      path.resolve(__dirname, "./node_modules/ionicons/dist/scss/")
    ]
  },
  plugins: [
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
      }
    })
  ]
}
