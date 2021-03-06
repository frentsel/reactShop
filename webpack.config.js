var webpack = require('webpack');

var isProduction = !1;

var config = {
    entry: "./react/js/App.jsx",
    output: {
        path: __dirname + '/react/',
        publicPath: "react/",
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            DEVELOPMENT: true,
            DEBUG: true,
        }),
    ],
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
            // {
            //     test: /\.less$/,
            //     loader: "style-loader!css-loader!autoprefixer-loader!less",
            //     // exclude: [/node_modules/, /react/]
            // },
            // {
            //     test: /\.gif$/,
            //     loader: "url-loader?limit=10000&mimetype=image/gif"
            // },
            // {
            //     test: /\.jpg$/,
            //     loader: "url-loader?limit=10000&mimetype=image/jpg"
            // },
            // {
            //     test: /\.png$/,
            //     loader: "url-loader?limit=10000&mimetype=image/png"
            // },
            // {
            //     test: /\.svg/,
            //     loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            // },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                // exclude: [/node_modules/, /react/],
                // query: {
                //     presets: ["es2015", "react"]
                // }
            },
            // {
            //     test: /\.json$/,
            //     loader: "json-loader"
            // }
        ]
    }
};

if (isProduction) {

    config.output.filename = 'bundle.min.js';
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            DEVELOPMENT: false,
            DEBUG: false,
        }),
    ];
}

module.exports = config;