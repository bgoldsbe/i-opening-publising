const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const exitOnError = process.env.EXIT_ON_ERROR === "1";

const alias = ["components"].reduce((obj, pkg) => {
  obj[pkg] = path.resolve(__dirname, `./src/js/${pkg}`);
  return obj;
}, {});
alias.css = path.resolve(__dirname, "./src/css")

const polyfills = [
  "core-js/stable",
  "regenerator-runtime/runtime",
  "whatwg-fetch"
];

module.exports = {
	mode: "production",
	devtool: "source-map",
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
      test: /\.s?css$/,
      oneOf: [
        {
          test: /\.module\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { 
                modules: true,
                url: false
              }
            },
            "resolve-url-loader",
            "sass-loader"
          ]
        },
        {
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    }
	] 
},
  resolve: {
    alias: alias
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
    ]}),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "./app/views/index.hbs"),
      template: "./app/templates/index.hbs",
      inject: false,
      minify: {
        removeScriptTypeAttributes: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production") // react optimizations
			}
		}),
    new WebpackManifestPlugin({fileName: "manifest.json"})
  ],
	optimization: {
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
