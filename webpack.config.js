const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin');

const themename = 'tone'
const destdir = path.join(__dirname, themename)
const themeplublic = '/' + themename

module.exports = env => { 

  const paths ={
    entryjs: './src/app/main.js',
    entryscss: './src/scss/main.scss',
    output: destdir  + '/app',
    public: themeplublic,
    cssfilename: 'main.css'
  }

  return {
    context: __dirname,
    stats: 'minimal',
    watch: true,
    name: 'blank',
    entry: {
      main: [
        paths.entryjs, 
        paths.entryscss
      ]
    },
    output: {
      path: paths.output,
      publicPath: paths.public,
      filename: '[name].js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [          
            { 
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ]
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { 
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        // Assets
        {
          test: /\.(jpg|jpeg|png|gif|svg|woff|ttf|eot|mp3)$/,
          type: 'asset/resource',
          generator: {
            emit: false,
            filename: content => { 

              return content.filename.replace(themename, '')
            }
          }
        }
      ]
    },
    plugins: [      
      new MiniCssExtractPlugin({
        filename: paths.cssfilename
      }),
      new LiveReloadPlugin({
        port: 35728,
        appendScriptTag: true,
        delay: 500,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        assets: path.join(destdir, 'assets')
      }
    }
  }
}