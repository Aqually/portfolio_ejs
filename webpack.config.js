var webpack = require('webpack');

module.exports = {
    entry: ['./src/js/main.js'],
    output: {
        path: __dirname + '/public/js',
        filename: "bundle.js"
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ],
        query: {
            presets: ['es2015', 'stage-1']
        }
    }
};
