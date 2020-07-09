const path = require('path')

/** @type {import('webpack').Configuration} */
const config = {
  entry: {
    'sign-in': './src/sign-in.ts',
    'sign-up': './src/sign-up/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  output: {
    filename: '[name].built.js',
    path: path.resolve(__dirname, '../server/src/public/dist'),
  },
}

module.exports = config
