// This include more packages, should cover all you need. 

// Generated using webpack-cli https://github.com/webpack/webpack-cli
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WorkboxWebpackPlugin from 'workbox-webpack-plugin'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import {config as configDotEnv} from 'dotenv'
import {fileURLToPath} from 'url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dotenv = configDotEnv({
  path: './.env',
});

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  // multiple entries
  entry: {
    bundle: './src/index.js', 
    main: {
      import: './src/main.js', 
      library: {
        type: 'global',
      },
    }
  },
  // dynamic output
  output: {
    globalObject: 'this',
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    historyApiFallback: {
      index: '/dist/index.html',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({process: 'process'}),
    new webpack.DefinePlugin({
      'process.env': `(${JSON.stringify(dotenv.parsed)})`,
    }),
    new CopyPlugin({
      patterns: [{from: './_redirects'}],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: './src/favicon.gif',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'minify-html-literals-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer'),
    },
  },
};

const chooseMode = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};

const resultConfig = chooseMode()

export default resultConfig;