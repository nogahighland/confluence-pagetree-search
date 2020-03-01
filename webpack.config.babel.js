import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

export default {
  mode: 'development',

  entry: {
    'content-script': path.join(__dirname, 'src', 'scripts', 'content-script.js'),
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: 'scripts/[name].bundle.js',
  },

  target: 'web',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__dirname, 'src', 'manifest.json'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'icons', 'icon.png'),
          to: path.join(__dirname, 'dist/icons'),
        }
      ]
    ),
    new VueLoaderPlugin()
  ],

  resolve: {
    extensions: [".vue", ".js"],
  },
};
