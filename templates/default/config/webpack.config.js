const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';
	const suffixHash = isProduction ? '.[contenthash]' : '';

	const plugins = [
		new MiniCssExtractPlugin({
			chunkFilename: `static/[name]${suffixHash}.css`,
			filename: `static/[name]${suffixHash}.css`
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolveApp('public/index.html'),
			inject: false,
			chunks: ['app'],
			minify: true
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: resolveApp('public/'),
					to: resolveApp('build/'),
					globOptions: {
						ignore: ['**/index.html']
					}
				}
			]
		})
	];

	if (!isProduction) {
		plugins.push(new webpack.ProgressPlugin());
	}

	return {
		entry: {
			app: resolveApp('src/index.js')
		},
		output: {
			filename: `static/[name]${suffixHash}.js`,
			chunkFilename: `static/[name]${suffixHash}.js`,
			path: resolveApp('build'),
			clean: true
		},
		module: {
			rules: [
				{
					include: [resolveApp('src')],
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								extends: resolveApp('config/babel.config.js')
							}
						}
					]
				},
				{
					test: /\.css$/,
					include: [resolveApp('src')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: resolveApp('config/postcss.config.js')
								}
							}
						}
					]
				},
				{
					test: /\.woff(2)?$/,
					include: [resolveApp('src')],
					exclude: /(images)/,
					type: 'asset/resource',
					generator: {
						filename: `fonts/[name]${suffixHash}[ext]`
					}
				},
				{
					test: /\.(jpe?g|png|gif|ico)$/i,
					include: [resolveApp('src')],
					type: 'asset/resource',
					generator: {
						filename: `images/[name]${suffixHash}[ext]`
					}
				},
				{
					test: /\.svg$/,
					include: [resolveApp('src')],
					type: 'asset/source'
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		devtool: isProduction ? false : 'source-map',
		context: appDirectory,
		stats: {
			assets: true,
			assetsSort: '!size',
			children: false,
			chunkModules: false,
			chunks: false,
			colors: true,
			entrypoints: false,
			excludeAssets: /.map$/,
			hash: false,
			modules: false,
			timings: true
		},
		devServer: {
			static: {
				directory: resolveApp('build')
			},
			historyApiFallback: true,
			port: 3000,
			compress: true,
			hot: true
		},
		plugins,
		optimization: {
			chunkIds: 'deterministic',
			mergeDuplicateChunks: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					parallel: true,
					terserOptions: {
						compress: {
							// Drop console.log|console.info|console.debug
							// Keep console.warn|console.error
							pure_funcs: ['console.log', 'console.info', 'console.debug']
						}
					}
				}),
				new CssMinimizerPlugin()
			],
			providedExports: false,
			removeAvailableModules: true,
			removeEmptyChunks: true,
			splitChunks: false
		}
	};
};
