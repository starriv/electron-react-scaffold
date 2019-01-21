import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const sourcePath = path.join(__dirname, '../../src/renderer')
const outputPath = path.resolve(__dirname, '../../app/renderer')

const devPort = process.env.PORT || 3000
const isDev =
  process.env.NODE_ENV === 'development' ? 'development' : 'production'

export default {
  mode: isDev,

  stats: {
    colors: true,
  },

  context: sourcePath,

  entry: {
    vendor: ['react'],
    renderer: './app.js',
  },

  output: {
    path: outputPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: isDev ? '/' : './',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'less-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
    alias: {},
  },

  plugins: [
    new CleanWebpackPlugin([outputPath]),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new HtmlWebpackPlugin({
      title: 'Electron React Scaffold ',
      template: path.join(__dirname, '../../src/renderer/index.template.html'),
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],

  externals(context, request, callback) {
    let isExternal = false
    const load = ['electron']
    if (load.includes(request)) {
      isExternal = `require("${request}")`
    }
    callback(null, isExternal)
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  devServer: {
    contentBase: outputPath,
    compress: true,
    port: devPort,
  },
}
