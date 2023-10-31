const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    //將css打包至js中
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css',
    //   chunkFilename: 'css/[name].css',
    // }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        // 也打包console.log
        // terserOptions: {
        //   compress: { pure_funcs: ['console.log'] },
        // },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    //將common.js打包至js中
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module, chunks, cacheGroupKey) {
    //         return `${cacheGroupKey}`
    //       },
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
})
