const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: path.join(__dirname, './src/index.jsx'),
		'1': ['react', 'react-dom'],
		'2': ['react-router', 'react-router-dom'],
	},
	output: {
		filename: 'bundle/[name].[hash].bundle.js',
		chunkFilename: 'bundle/[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'http://hashchange.s3-website-us-west-2.amazonaws.com/'
	},
	plugins: [
		new CleanWebpackPlugin(['dist/bundle']),
		
		new HtmlWebpackPlugin({
			template: 'index2.html',
			filename: 'index.html',
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: '1',
			chunks: ['1'],
			minChunks: Infinity,
			filename: 'bundle/1.bundle.js',
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: '2',
			chunks: ['2'],
			minChunks: Infinity,
			filename: 'bundle/2.bundle.js',
		}),

		new UglifyJSPlugin({
			parallel: true,
			cache: true,
		})
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['env', 'react']
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
		]
	},
	resolve: {
		alias: {
            'components': path.resolve(__dirname, 'src/'),
            'routes': path.resolve(__dirname, 'src/routes/')
		}
	}
};
