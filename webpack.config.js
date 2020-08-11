const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtraWatchWebpackPlugin = require("extra-watch-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const exitOnError = process.env.EXIT_ON_ERROR === "1";

const alias = ["components"].reduce((obj, pkg) => {
  obj[pkg] = path.resolve(__dirname, `./src/js/${pkg}`);
  return obj;
}, {});

const polyfills = [
  "core-js/stable",
  "regenerator-runtime/runtime",
  "whatwg-fetch"
];

module.exports = {
  name: 'js',
  mode: "production",
  bail: exitOnError,
	entry: {
    main: [...polyfills, path.resolve(__dirname, "./src/js/main.js")]
  },
  output: {
    path: path.resolve(__dirname, "./app/public/js"),
    publicPath: "/js/"
  },
  module: {
    rules: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			rules: [
				{
					loader: "babel-loader"
				}
			]
    }, {
      test: /\.json$/,
      loader: "json"
    }, {
			test: /\.scss$/,
			exclude: path.resolve(__dirname, "./src/css/main.scss"),
			use: ExtractTextPlugin.extract({
				use: [
					{
						loader: "css-loader",
						options: {
							camelCase: true,
							importLoaders: 1,
							modules: true
						}
					},
					"sass-loader"
				],
				fallback: "style-loader"
			})
		}, {
			test: /main\.scss$/,
			use: ExtractTextPlugin.extract({
				use: [
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: [autoprefixer]
						}
					},
					"sass-loader"
				],
				fallback: "style-loader"
			})
		}, {
			test: /\.scss$/,
      exclude: path.resolve(__dirname, "./src/css/main.scss"),
			use: [{
				loader: "css-loader",
				options: {
          modules: {
            localIdentName: "[name]__[local]___[hash:base64:8]"
				  }
        }
			}]
		}, {
			test: /main\.scss$/,
			use: [{
				loader: "css-loader"
			}]
		}]
  },
  resolve: {
    alias
  },
  plugins: [
    new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "./app/robots.txt"),
					to: path.resolve(__dirname, "./app/public/robots.txt")
				},
				{
					from: path.resolve(__dirname, "./src/images"),
					to: path.resolve(__dirname, "./app/public/images")
				}
			]
		}),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "./app/views/index.hbs"),
      template: path.resolve(__dirname, "./app/templates/index.hbs"),
      inject: false,
      minify: {
        removeScriptTypeAttributes: true,
        collapseWhitespace: true
      }
    }),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production") // react optimizations
			}
		}),
    new WebpackManifestPlugin({fileName: "manifest.json"}),
		new ExtractTextPlugin({
			filename: "../css/main.css",
			allChunks: true
		}),
		new OptimizeCSSAssetsPlugin({
			cssProcessor: cssnano,
			cssProcessorOptions: {
				options: {
					discardComments: {
						removeAll: true
					}
				}
			}
		}),  
	],
	optimization: {
		minimize: true,
		noEmitOnErrors: true,
		namedModules: true,
		namedChunks: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]|[\\/]vendor[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
	},
	performance: {
		hints: false
	},  
  stats: {
    children: false,
    colors: true
  }
};
