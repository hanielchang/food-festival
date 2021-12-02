const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new WebpackPwaManifest({
      name: 'Food Event',
      short_name: 'Foodies',
      description: 'An app that allows you to view upcoming food events.',
      start_url: '../index.html',
      background_color: '#01579b',
      theme_color: '#ffffff',
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve('assets/img/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
        }
      ]
    })
  ],
  mode: 'development'
};

module.exports = config;


// webpack's main approach is to bundle the JavaScript assets. By splitting the code into modules,
// webpack can bundle them into bite-sized chunks that can be loaded on demand. This will limit the
// browser's valuable processing power to focus on the critical chunks for the page load. Check
// Code-splitting image to get a visual representation.

// There are several ways to code split, which depend on which part of your project you would like to bundle:

  // Entry point splitting: separates code by entry points in your app. An entry point is defined by each page's requisite script files to load.

  // Vendor splitting: separates vendor code (e.g., jQuery, Bootstrap, lodash, etc.) away from your app's code. A vendor bundle can also be shared 
  // between other bundles, further reducing overall bundle size by creating a common chunk.

  // Dynamic splitting: separates code and allows dynamic importing of modules. This type of splitting is often best for single-page applications that use front-end routing.

  // ------------------------- Loaders vs. Plugins ------------------------- //

  // Loaders pre-process the assets on a file by file basis before and during the build.

  // Plugins are scoped more on the bundle level and deliver changes at the end of the build.

  // While loaders are configured in the module property of the webpack configuration object, plugins are configured in the plugins array.

  // Loaders are used mostly for non JavaScript files such as image, CSS, and HTML files.
