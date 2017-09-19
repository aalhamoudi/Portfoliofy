const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        resolve: {
            extensions: [ '.js' ]
        },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, use: extractCSS.extract(['css-loader']) }
            ]
        },
        entry: {
            vendor: [
                'tether',
                'bootstrap',
                'event-source-polyfill',
                'isomorphic-fetch',
                'react',
                'react-dom',
                'react-router',
                'jquery',
                'jquery-mobile-events/jquery-mobile-events.js',
                'bootstrap/dist/css/bootstrap.min.css',
                'font-awesome/css/font-awesome.css',
                'animate.css/animate.min.css'
            ],
        },
        output: {
            path: path.join(__dirname, 'public'),
            publicPath: '/public/',
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            extractCSS,
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', Tether: "tether", "window.Tether": "tether", }),
            new webpack.DllPlugin({
                path: path.join(__dirname, 'public', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
};
