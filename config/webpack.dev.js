'use strict';

const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common');
const helpers      = require('./helpers');

/* 
* The mode tells webpack to use its built-in optimizations accordingly. 
* 
* Devtool option controls if and how source maps are generated. 
* 
* Using devtool: cheap-module-eval-source-map tells webpack to process 
* source maps from loaders for better results. However, loader source maps are 
* simplified to a single mapping per line.
*/
module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',

    /*
    * Tells webpack where to emit the bundles it creates, and how to name the files.
    * It defaults to ./dist/main.js for the main output file, and to the ./dist
    * folder for any other generated file. 
    * 
    * For the purposes of deploying to GitHub pages, this has been set to docs
    * instead of dist.
    */
    output: {
        path: helpers.root('docs'),
        publicPath: './',
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    optimization: {
        noEmitOnErrors: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});