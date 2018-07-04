const path = require("path");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin')
const extractTextPlugin = new ExtractTextPlugin('./css/style.css');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "./js/bundle.js",
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "eslint-loader",
            options: {
              fix: true,
              failOnError: true,
            },
          }
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
                  outputPath: './css/',
									plugins: () => (
										[
											require('postcss-cssnext')(
												{ browsers: ['> 0.01%'] }
											),
											require('postcss-simple-vars'),
											require('postcss-nested'),
											require('postcss-flexbugs-fixes'),
											require('postcss-import')
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
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../dist/img/',
							publicPath: '',
						}
					}
				]
			},
    ]
  },
  plugins: [
    extractTextPlugin,
    new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: path.resolve(__dirname) },
			files: [
				'./dist/*.js',
				'./dist/*.css',
			]
    }),
    new StylelintPlugin({
      configFile: ".stylelintrc",
      files: '**/*.css'
    })
  ]
};