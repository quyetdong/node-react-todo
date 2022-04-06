import { join, dirname } from "path";
import { fileURLToPath } from "url";
import nodeExternals from 'webpack-node-externals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  entry: {
    server: './index.js'
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.cjs'
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        // transpile es6 to es5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}