const commonConfig = require('./webpack.common')

/** @type {import('webpack').Configuration} */
const prodConfig = {
  ...commonConfig,
  mode: 'development',
}

module.exports = prodConfig
