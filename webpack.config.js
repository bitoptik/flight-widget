const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-redux', 'redux',
];

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return ({
        entry: {
            bundle: ['babel-polyfill', './src/index.jsx'],
            vendors: VENDOR_LIBS,
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'assets/js/[name].[hash:8].js',
            chunkFilename: 'assets/js/[name].[chunkhash:8].js',
        },
        module: {
            rules: [
                {
                    oneOf: [
                        {
                            test: /\.js|jsx$/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    cacheDirectory: isProduction,
                                    compact: isProduction,
                                },
                            },
                        },
                        {
                            test: /\.s|css$/,
                            exclude: /node_modules/,
                            use: [
                                isProduction ?
                                    {
                                        loader: MiniCssExtractPlugin.loader,
                                        options: {
                                            publicPath: '../../',
                                        },
                                    } :
                                    'style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 2,
                                        minimize: isProduction,
                                        sourceMap: true,
                                    },
                                },
                                'sass-loader'
                            ],
                        }
                    ],
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                template: './src/templates/index.html',
                title: 'Flights',
                description: 'This is widget that contains info about flights',
                applicationName: 'OneTwoTrip widget',
                minify: {
                    removeComments: isProduction,
                    collapseWhitespace: isProduction,
                    removeRedundantAttributes: isProduction,
                    useShortDoctype: isProduction,
                    removeEmptyAttributes: isProduction,
                    removeStyleLinkTypeAttributes: isProduction,
                    keepClosingSlash: isProduction,
                    minifyJS: isProduction,
                    minifyCSS: isProduction,
                    minifyURLs: isProduction,
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/css/styles.[contenthash:8].css',
            }),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [path.resolve(__dirname, 'src'), './node_modules'],
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
            compress: true,
            stats: {
                all: false,
                warnings: true,
                errors: true,
                errorDetails: true,
            },
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: 'vendors',
                        chunks: 'initial',
                        test: /[\\/]node_modules[\\/]/,
                    },
                },
            },
        },
    });
};
