const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const webpack = require('webpack')


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '192.168.1.111',
    hot: true,
    port: 3000,
    open: true,
  },
  lintOnSave: true
})

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
			new webpack.ProvidePlugin({
				$:"jquery",
				jQuery:"jquery",
				"windows.jQuery":"jquery"			        
			})
    ],
  },
};