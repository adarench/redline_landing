const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/[name].[contenthash].js',
      clean: true
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 9000,
      hot: true,
      open: true
    },
    module: {
      rules: [
        // JavaScript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // SCSS/CSS
        {
          test: /\.(scss|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        // Images
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        },
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]'
          }
        }
      ]
    },
    plugins: [
      // Extract CSS into separate files
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      
      // Generate HTML file
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        minify: isProduction
      }),
      
      // Copy static assets
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'src/images', 
            to: 'images',
            noErrorOnMissing: true
          }
        ]
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: isProduction
    },
    resolve: {
      extensions: ['.js', '.scss', '.css']
    },
    // Source maps for development
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map'
  };
};