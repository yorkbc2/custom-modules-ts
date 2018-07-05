var path = require('path')

module.exports = {
	entry: './index.ts',
	devtool: "inline-source-map",
	output: {
		path: path.resolve(__dirname),
		filename: 'index.js'
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	}
}