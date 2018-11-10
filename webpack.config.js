'use strict'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: 'production',
    target: 'web',
    entry: path.join(__dirname,'src/index.js'),
    output:{
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"':'"production"'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use:['vue-style-loader','style-loader','css-loader']
            },
            {
                test: /\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader',
                ]
            },
            {
                test: /\.less/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 1024,
                            name: '[name]-thm.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }
        ]
    }
}


if(isDev){
    config.mode = 'development'
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay:{
            errors:true
        },
        open: true,
        hot: true
    }
    config.performance = {
      hints: false
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config