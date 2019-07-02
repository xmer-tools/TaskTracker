var path = require('path'),
    webpack = require('webpack');

(function () {
    "use strict";
    
    var config = {
        /** These "Plugins" can be used in any javascript file compiled by webpack
        * They're essentially global variables
        * 
        * This is the equivalent of having the following line on every document
        * var _ = require("lodash");
        */
        plugins: [
            new webpack.ProvidePlugin({
                React: 'react',
                ReactDOM: 'react-dom',
                PropTypes: 'prop-types',
                '_': 'lodash'
            }),
        ],
        
        mode: "production",

        /**
         * The entry point(s) for webpack to compile
         * 
         * Webpack will loop through all of these entry points
         * and create a single file for each one
         * 
         * Each entry point will (probably) have "import" and "require" in them 
         * that webpack will trace and compile along side
         * 
         * This is where webpack becomes the most useful, instead of the client having to download 
         * 20 js files, 10 css files, and 25 images, they download one js file that contains the data from each of those other files
         */
        entry: {
            site: './content/base.jsx'
        },
        
        /**
         * This defines where the bundle will be stored after compiling
         * 
         * The path variable determines what folder to put it in
         * 
         * path.join(__dirname, 'js', 'react') gets translated into './js/react'
         * this just ensures that no matter where you call webpack the path will be 
         * relevant to where this file is located, not where the call is made
         * 
         * filename is what to name the bundle. the [name] variable is required if you have more than one entry point.
         * [name] gets translated into the property name of the entry point. In this example it would be
         * "base.bundle.js"
         * 
         * publicPath is optional and only used if you're hotloading your modules
         * This is where the client can go to find the bundle if they navigate to your website
         */
        output: {
            path: path.join(__dirname, '.public'),
            filename: '[name].bundle.js'
        },
        
        /**
         * The two main properties of resolve are
         * alias
         * and 
         * extensions
         * 
         * both of which are optional
         * 
         * alias is an object you can use to create aliases for common paths, such as an image folder
         * If you're 6 folders deep and needed to get to the top level image folder you would need:
         * require('../../../../../../img/'), however using an alias you could just type: require('_img/')
         * 
         * extensions allows you to define common file extensions 
         * and their priorities. If you use a lot of jsx files instead of typing
         * require('./example.jsx') you could type require('./example')
         * this goes for any file exension in the extensions array
         * 
         * if there are two files with the same name and both of their extensions are in the array 
         * then the require will select the extension that comes first in the array
         * in this example, example.jsx would be picked before example.scss.
         */
        resolve: {
            alias: {
                '_redux': path.join(__dirname, 'content', '.redux'),
                '_images': path.join(__dirname, 'content', 'images'),
            },
            extensions: ['.jsx', '.js', '.scss', '.jpeg', '.jpg', '.png', '.gif']
        },
        
        /**
         * Module loaders are where the files actually get compiled.
         * This is where it gets a little close to "black box programming" - which isn't always a bad thing
         * 
         * in the loaders array of objects each object has a "test" and either a loader or an array of loaders
         * the test is a regex expression to determine if the file being called into the bundle meets that test
         * (an exmaple.jsx file would return true for \/.jsx?$/)
         * 
         * Once webpack determines which test returns true it runs the file against the loader(s), 
         * compiling the file into whichever format the loader is suppose to
         */
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    loader: 'style-loader!css-loader!sass-loader'
                },
                { 
                    test: /\.css$/, 
                    loader: "style-loader!css-loader" 
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                { 
                    test: /\.(gif|jpg|jpeg|png|woff|woff2|otf|eot|ttf|svg|mp4|webm)$/,
                    loader: 'url-loader'
                }
            ]
        }
    };
    
    /**
     * The following is to determine what build type to perform
     * npm start watches the files and doesn't minify - for development
     * npm run build minifies the files gets the bundle production ready
     */
    if(process.env.development != 1) {
        console.log("\n----------------------------");
        console.log("THIS IS A PRODUCTION BUILD OF THE REACT APP.");
        console.log("FOR DEVELOPMENT USE 'NPM START'");
        console.log("----------------------------\n");

        config.plugins.push (
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
        );
        config.optimization = {
            minimize: true
        };
    }
    else {
        console.log("\n----------------------------");
        console.log("THIS IS A DEVELOPMENT BUILD");
        console.log("FOR PRODUCTION USE 'NPM RUN BUILD'");
        console.log("----------------------------\n");
        config.mode = "development";
    }
    
    module.exports = config;
}());