const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: ['@babel/plugin-proposal-class-properties']
			}
		}
	];

	if (isDev) {
		loaders.push('eslint-loader')
	}

	return loaders;
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: ['@babel/polyfill', './index.js'],
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
	},
	target: isProd ? ['web', 'es5'] : 'web',
	// target: 'web',
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core')
		}
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 4200,
		hot: isDev
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd
			}
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'server.php'),
					to: path.resolve(__dirname, 'dist')
				},
				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: path.resolve(__dirname, 'dist')
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// hmr: isDev,
							// reloadAll: true
						}
					},
					'css-loader',
					'sass-loader'
				],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		]
	}
};

