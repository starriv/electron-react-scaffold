import webpack from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'


const sourcePath = path.join(__dirname, "../../src/main")
const outputPath = path.resolve(__dirname, '../../app/main')

export default {
    mode: 'production',

    context: sourcePath,

    target: 'electron-main',
    externals: [nodeExternals()],

    entry: {
        main: './index.js'
    },
    
    output: {
        path: outputPath,
        filename: '[name].js',
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            $dirname: '__dirname',
        }),
    ],

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }]
    },

    resolve: {
        extensions: [
            '.js',
        ],
        alias: {},
    },
}