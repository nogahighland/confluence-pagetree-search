import copy from 'copy-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'

import path from 'path'

/* eslint-disable import/no-default-export */
export default {
  mode: 'development',

  entry: {
    index: path.join(__dirname, 'src', 'index.ts')
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.pug/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new copy({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'manifest.json'),
          to: path.join(__dirname, 'dist')
        },
        {
          from: path.join(__dirname, 'assets', 'icon.png'),
          to: path.join(__dirname, 'dist')
        }
      ]
    }),
    new VueLoaderPlugin()
  ],

  resolve: {
    extensions: ['.vue', '.ts', '.js'],
    alias: {
      '@': path.resolve('./src')
    }
  }
}
