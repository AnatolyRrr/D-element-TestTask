const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const devMode = process.env.NODE_ENV !== "production";
const prodMode = !devMode;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(prodMode) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
};

const filename = ext => devMode ?  `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, './dist'),
    },
    optimization: optimization(),
    devServer: {
        port:4200,
        hot: devMode
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.pug',
            filename: 'index.html',
            minify: {
                collapseWhitespace: prodMode
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new HtmlWebpackPugPlugin()
    ].concat(devMode ? [] : [new MiniCssExtractPlugin(
        {filename: filename('css')}
    )]),
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                      loader: "postcss-loader",
                      options: {
                          postcssOptions: {
                              plugins: [
                                  [
                                      "autoprefixer"
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/inline'
            },
            {
                test: /\.pug$/,
                loader: '@webdiscus/pug-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    }
}