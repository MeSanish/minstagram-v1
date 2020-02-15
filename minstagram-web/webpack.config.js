const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")
const dotEnv = require("./env/dot-env");

const PUBLIC_PATH = '/';

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/main.tsx'
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    devtool: 'eval-cheap-source-map',
    devServer: {
      contentBase: path.resolve(__dirname),
      publicPath: PUBLIC_PATH,
      port: '8000',
      historyApiFallback: true,
      host: '0.0.0.0' // host for auto open in browser
    },
    module: {
      rules: [
        {
          test: /(src|config|env).*\.tsx?$/,
          use: [
            {
              loader: 'awesome-typescript-loader', // for tsx transpile to es5 modules
              options: {
                reportFiles: ['src/**/*.{ts,tsx}', 'config/**/*.{ts,tsx}']
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, './'), 'node_modules'],
      extensions: ['.ts', '.tsx','.js', '.jsx']
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      }),
      new webpack.DefinePlugin({
        envConfig: JSON.stringify(dotEnv.getEnvConfig(process.env.NODE_ENV))
      })
    ]
  }
}