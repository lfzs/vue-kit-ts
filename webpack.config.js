const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isDev = process.env.APP_ENV === 'development'
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve('dist'),
    filename: `js/${isDev ? '[name]' : '[fullhash]'}.js`,
    chunkFilename: `js/${isDev ? 'chunk.[name]' : '[contenthash]'}.js`,
    assetModuleFilename: 'static/[hash][ext][query]',
    publicPath: process.env.BASE_URL,
  },
  mode: isDev ? 'development' : 'production',
  devServer: {
    host: '0.0.0.0',
    // open: process.env.BASE_URL,
    historyApiFallback: true, // 路由全部重定向到首页
    client: { logging: 'none', overlay: false },
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  devtool: isDev && 'eval-cheap-source-map',
  resolve: {
    alias: { '@': resolve('src') },
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ __VUE_OPTIONS_API__: false, __VUE_PROD_DEVTOOLS__: false }),
    new webpack.EnvironmentPlugin(['APP_ENV', 'BASE_URL']),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.ico' }),
  ].concat(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader', exclude: /node_modules/ },
      { test: /\.tsx?$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] }, exclude: /node_modules/ },
      { test: /\.(png|jpg|gif|jpeg|svg|woff|woff2|eot|ttf|otf)$/, type: 'asset/resource' },
    ],
  },
  stats: 'info',
  experiments: {
    topLevelAwait: true,
  },
  performance: {
    hints: false,
  },
}
