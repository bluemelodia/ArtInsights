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
    /*
    * Skips the emitting phase whenever there are errors when compiling. 
    * This ensures that no erroring assets are emitted. 
    */
    optimization: {
        noEmitOnErrors: true
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    /* The faster webpack TS loader, uses dependency resolution 
                     * to build module dependency graph, relatively speeding up
                     * the build process. */
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    /* Chain-to loader that inlines all HTML and styles in 
                     * Angular components. */
                    'angular2-template-loader',
                    /* Enables string-based module loading with Angular router. */
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ]
    },
    /* 
     * When using the HTML5 History API, the index.html page will likely
     * have to be served in place of any 404 responses. For that we need to
     * enable historyAPIFallback. Stats option lets you precisely control what
     * bundle info gets displayed. This is a nice middle ground if you want 
     * some bundle info, but not all of it. 
     * 
     * Single Page Applications (SPA) typically only utilise one index file 
     * that is accessible by web browsers: usually index.html. Navigation 
     * in the application is then commonly handled using JavaScript with 
     * the help of the HTML5 History API. This results in issues when the 
     * user hits the refresh button or is directly accessing a page other 
     * than the landing page, e.g. /help or /help/online as the web server
     * bypasses the index file to locate the file at this location. As your
     * application is a SPA, the web server will fail trying to retrieve the
     * file and return a 404 - Not Found message to the user.
     * 
     * This tiny middleware addresses some of the issues. Specifically, 
     * it will change the requested location to the index you specify 
     * (default being /index.html) whenever there is a request which fulfills
     * the following criteria:
     *  The request is a GET request which accepts text/html, 
     *  is not a direct file request, i.e. the requested path does not contain a
     *  . (DOT) character and
     * does not match a pattern provided in options.rewrites (see options below)
     * 
     * Additional Reading: 
     * https://github.com/bripkens/connect-history-api-fallback
     * https://css-tricks.com/using-the-html5-history-api/
     */
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});