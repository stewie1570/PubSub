var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/pubsub.js",
    output: {
        path: __dirname,
        filename: "index.js",
        library: 'Pubsub',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader" }
        ]
    },
    watch: true,
    devtool: 'source-map'
};