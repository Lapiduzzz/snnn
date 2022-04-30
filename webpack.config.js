const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('IS DEV:',isDev)

const optimization = () => {
    const config ={
        splitChunks: {
            chunks: "all"
            }
        }
    if (isProd){
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const cssLoaders = extra => {
    const loaders = [
        {
        loader: MiniCssExtractPlugin.loader,
        options: {
        },
    }, 'css-loader']
    if (extra){
        loaders.push(extra)
    }
    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ]
    }
    if (preset){
        opts.presets.push(preset)
    }
    return opts
}

module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill','./src/app/index.jsx']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json",".jsx"],
    },
    optimization: optimization(),
    devServer: {
        historyApiFallback: true,
        port: 3000,
        hot: isDev,
        proxy:{
            port: 3001
        }
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/public/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use:['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test: /\.xml$/,
                use:['xml-loader']
            },
            {
                test: /\.csv$/,
                use:['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions()
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}