const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: path.join(__dirname, './src/index.jsx'),
		'react': ['react', 'react-dom'],
		'react-router': ['react-router', 'react-router-dom']},
	output: {
		filename: 'bundle/[name].[hash].bundle.js',
		chunkFilename: 'bundle/[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
		}),
		
		new webpack.optimize.CommonsChunkPlugin({
			name: 'react',
			chunks: ['react'],
			minChunks: Infinity,
			filename: 'bundle/[name].bundle.js',
		}),
		
		new webpack.optimize.CommonsChunkPlugin({
			name: 'react-router',
			chunks: ['react-router'],
			minChunks: Infinity,
			filename: 'bundle/[name].bundle.js',
		}),
	],
	devServer: {
     	contentBase: './dist',
		inline: true,
		historyApiFallback: true,
   	},	
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ['env','react']
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
				test: /\.(png|svg|jpg|gif|json)$/,
				use: [
					'file-loader'
				]
	        },
		]
	},
	resolve:{
		alias: {
			'components': path.resolve(__dirname, 'src/'),
			'routes': path.resolve(__dirname, 'src/routes/')
		}
	}
};