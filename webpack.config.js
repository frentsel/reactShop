var webpack = require('webpack');

module.exports = {
    entry: "./react/js/main.js",
    output: {
        path: __dirname + '/react/',
        publicPath: "react/",
        filename: "bundle.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                // exclude: [/node_modules/, /react/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less",
                // exclude: [/node_modules/, /react/]
            },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                // exclude: [/node_modules/, /react/],
                // query: {
                //     presets: ["es2015", "react"]
                // }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    }
}