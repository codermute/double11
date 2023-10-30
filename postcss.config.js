module.exports = {
    "plugins": {
      // "postcss-pxtorem": {
      //     rootValue: 75, // 根据设计图尺寸比例设置
      //     propList: ['*'], // 需要被转换的属性
      //     selectorBlackList: ['van'] // 不进行px转换的选择器
      // }
			'postcss-pxtorem': {
				rootValue({ file }) {
					return file.indexOf('vant') !== -1 ? 37.5 : 75;
				},
				propList: ['*'],
			},
    }
  }