const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const bundleOutputDir = './public';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        entry: { 'main': './client/App.tsx' },
        resolve: { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                { test: /\.ts(x?)$/, include: /client/, use: 'babel-loader' },
                { test: /\.tsx?$/, include: /client/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader' }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=2500000' },
                //{ test: /\.(jpe?g|png|gif|svg)$/i, loaders: [
                //        'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
                //        'image-webpack-loader?bypassOnDebug'
                //    ]}
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./public/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('style.css')
        ]),
        devServer: {
            hot: false,
            // enable HMR on the server

            contentBase: path.resolve(__dirname, bundleOutputDir),
            // match the output path

            publicPath: '/'
            // match the output `publicPath`
        }
    }];
};
