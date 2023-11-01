const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: true,
  // devServer: {
  //   host: '192.168.1.111',
  //   hot: true,
  //   port: 3000,
  //   open: true,
  // },
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
          drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
          }
        },
      }),
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
			new webpack.ProvidePlugin({
				$:"jquery",
				jQuery:"jquery",
				"windows.jQuery":"jquery"
			})
    ],
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
};
