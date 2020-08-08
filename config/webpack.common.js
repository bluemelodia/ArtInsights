/*
* This config will be used for both dev and prod.
*/

'use strict';

/*
* Remove/clean build folders before building again. 
*/
const CleanWebpackPlugin   = require('clean-webpack-plugin');

/* 
* Generates an HTML5 file that includes all our webpack bundles 
* in the body using script tags. It requires the path to the template. 
*/
const HtmlWebpackPlugin    = require('html-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const helpers              = require('./helpers');
const isDev                = process.env.NODE_ENV !== 'production';

module.exports = {
    /* 
    * Entry point: indicates which module webpack should use to begin building
    * out its internal dependency graph. Webpack will then figure out which modules
    * and libraries that the entry point depends on (directly || indirectly).
    */
    entry: {
        /* Only imports the app's third-party modules, ex. angular. */
        vendor: './src/vendor.ts',
        /* 
         * Needed to run an Angular app in most browsers. This bundle file
         * will load first, so this is a good place to configure the browser
         * environment for production or deployment.
         */
        polyfills: './src/polyfills.ts',
        main: isDev ? './src/main.ts' : './src/main.aot.ts',
        styles: './src/styles/styles.scss'
    },

    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },

    /* 
    * Loaders: 
    *   the 'test' property identifies which file(s) should be transformed
    *   the 'use' property indicates which loader should be used to do the transforming
    */
    module: {
        /* 
         * html-loader: used to load .html files. 
         *
         * sass-loader: loads a Sass/SCSS file and compiles it to CSS. Has a 
         * dependency on node-sass.
         * 
         * css-loader: collects CSS from all the CSS files referenced in the app
         * (and therefore in the dependency tree) and outputs it as a string.
         * 
         * style-loader (dev only): takes the output string generated by the css-loader
         * and places it inside the <style> tags in the index.html file (inline styles).
         *
         * Styles are not minified by default in production mode. The webpack dev server
         * takes our styles and puts them into main.js, and then adds them into our HTML
         * via inline styles (which are slow). To be more efficient, we need to take our
         * styles and move them into a CSS file that can be minified.
         */
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'styles')
            },
            /* 
            * In Angular apps, we add styles to components by passing a file path
            * to the styleUrls array. However, we need to output styles as a string.
            * The to-string-loader will do that for us.
            */
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'app')
            },
        ]
    },

    /* 
    * Loaders are used to transform certain types of modules, while plugins are
    * leveraged to perform a wider range of tasks, ex. bundle optimization, asset
    * management, and injecting environment variables. 
    */
    plugins: [
        /* Remove and clean build folders. By default, it removes all files inside of
         * webpack's output.path directory plus unused webpack assets after every
         * successful build. */
        new CleanWebpackPlugin(
            helpers.root('docs'), { root: helpers.root(), verbose: true }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        /* 
         * Tell the CopyWebpackPlugin to copy all files in src/images to 
         * the 'images' folder inside of the output 'docs' folder.
         * As the images will now be served from the docs folder, we can now 
         * use relative paths for image files. 
         * 
         * Webpack will not process images as part of bundling by default, because
         * we have no import/require statements for our image resources in JS. 
         * Therefore, Webpack will not see them as dependencies.
         * */
        new CopyPlugin([
            { from: 'src/images', to: 'images' } 
        ]), 
    ]
};