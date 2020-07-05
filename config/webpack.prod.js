'use strict';

const webpackMerge            = require('webpack-merge');
const ngw                     = require('@ngtools/webpack');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano                 = require('cssnano');

const commonConfig            = require('./webpack.common');
const helpers                 = require('./helpers');

/* Allows creation of a webpack file that's generic across all configs, that can
 * be merged with another config. */
module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    /*
    * Tell webpack to output bundles to the docs folder. 
    * The hash to the file names helps webpack detect whether a file has changed. 
    * For this purpose, webpack provides ploaceholders to attach specific info 
    * to outputs:
    * 
    *   [id] returns the chunk id.
    *   [hash] returns the build hash. If any portion of the build changes, 
    *   this will change as well.
    * 
    *   Save hash for prod, as it's not essential for dev.
    */
    output: {
        path: helpers.root('docs'),
        publicPath: './',
        filename: '[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    optimization: {
        /* As with dev, skip the emitting phase whenever there are errors while
        * compiling. This ensures that no erroring assets are emitted. */
        noEmitOnErrors: true,
        /* Indicates which chunks will be selected for optimization. 
         * Providing 'all' means that chunks can be shared between async and non-async chunks. */
        splitChunks: {
            chunks: 'all'
        },
        /* 
        * Imported modules are initialized for each runtime chunk separately.
        * 
        * When working on a project with multiple entry points, we want to have 
        * only one runtime instance - hence set it to 'single' 
        */
        runtimeChunk: 'single',
        minimizer: [
            /* Uses uglify-us to minify JS files. Set cache & parallel properties 
             * to true in order to enable file caching & use multi-process parallel
             * processing to improve the build speed. */
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            /* Searches for CSS assets during the webpack build and will optimize
             * and minify it. We use the cssnano processor for optimization. 
             * All comments will be removed from the minified CSS, and no messages
             * will be printed to the console. */
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: false
            })
        ]
    },

    module: {
        /* This is the official plugin that AOT uses to compile Angular 
        * components & modules. This loader works with the webpack plugin to compile TS.
        * We need to include both, and not include any other TS compiler loader. */
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new ngw.AngularCompilerPlugin({
            tsConfigPath: helpers.root('tsconfig.aot.json'),
            entryModule: helpers.root('src', 'app', 'app.module#AppModule')
        })
    ]
});