import fs from 'node:fs';
import path from 'node:path';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export default (_env, argv) => {
	const isProduction = argv.mode === 'production';
	const suffixHash = isProduction ? '.[contenthash]' : '';

	const plugins = [
		new MiniCssExtractPlugin({
			chunkFilename: `static/[name]${suffixHash}.css`,
			filename: `static/[name]${suffixHash}.css`,
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolveApp('public/index.html'),
			inject: false,
			chunks: ['app'],
			minify: true,
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: resolveApp('public/'),
					to: resolveApp('build/'),
					globOptions: {
						ignore: ['**/index.html'],
					},
				},
			],
		}),
	];

	if (!isProduction) {
		plugins.push(new webpack.ProgressPlugin());
	}

	return {
		entry: {
			app: resolveApp('src/index.ts'),
		},
		output: {
			filename: `static/[name]${suffixHash}.js`,
			chunkFilename: `static/[name]${suffixHash}.js`,
			path: resolveApp('build'),
			clean: true,
		},
		module: {
			rules: [
				{
					include: [resolveApp('src')],
					test: /\.(js|jsx)$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								extends: resolveApp('config/babel.config.js'),
							},
						},
					],
				},
				{
					include: [resolveApp('src')],
					test: /\.(ts|tsx)$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								extends: resolveApp('config/babel.config.js'),
							},
						},
						{
							loader: 'ts-loader',
						},
					],
				},
				{
					test: /\.css$/,
					include: [resolveApp('src')],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: resolveApp('config/postcss.config.js'),
								},
							},
						},
					],
				},
				{
					test: /\.woff(2)?$/,
					include: [resolveApp('src')],
					exclude: /(images)/,
					type: 'asset/resource',
					generator: {
						filename: `fonts/[name]${suffixHash}[ext]`,
					},
				},
				{
					test: /\.(jpe?g|png|gif|ico)$/i,
					include: [resolveApp('src')],
					type: 'asset/resource',
					generator: {
						filename: `images/[name]${suffixHash}[ext]`,
					},
				},
				{
					test: /\.svg$/,
					include: [resolveApp('src')],
					type: 'asset/source',
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			extensionAlias: {
				'.js': ['.ts', '.tsx', '.js'],
			},
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
			timings: true,
		},
		devServer: {
			static: {
				directory: resolveApp('build'),
			},
			historyApiFallback: true,
			port: 3000,
			compress: true,
			hot: true,
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
							pure_funcs: ['console.log', 'console.info', 'console.debug'],
						},
					},
				}),
				new CssMinimizerPlugin(),
			],
			providedExports: false,
			removeAvailableModules: true,
			removeEmptyChunks: true,
			splitChunks: false,
		},
	};
};
