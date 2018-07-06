const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const extractTextPlugin = new ExtractTextPlugin('./css/style.css');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: './js/bundle.js',
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              failOnError: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: extractTextPlugin
          .extract({
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
                options: {
                  outputPath: '/css/',
                  plugins: () => (
                    [
                      require('postcss-cssnext')(
                        { browsers: ['> 0.01%'] }
                      ),
                      require('postcss-simple-vars'),
                      require('postcss-nested'),
                      require('postcss-flexbugs-fixes'),
                      require('postcss-import'),
                    ]
                  )
                }
              },
            ]
          })
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/img/',
              publicPath: '',
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
          },
          {
            loader: 'ejs-compiled-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    extractTextPlugin,
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: path.join(__dirname, '/dist/') },
      files: [
        '/js/*.js',
        '/css/*.css',
      ],
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.css',
    }),
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: './src/index.ejs',
    }),
    new HtmlWebpackPlugin({
      filename: '../dist/about.html',
      template: './src/about.ejs',
    }),
  ],
};
