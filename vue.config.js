'use strict';
const path = require('path');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const debugMode = process.env.NODE_ENV === 'development';

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // devServer: {
  //   proxy: 'http://manage-t.housefun.com.tw/', // 設置代理.
  // },
  pages: {
    index: {
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    },
  },
  // publicPath: debugMode ? '/' : '/building',
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: debugMode,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // 緩存加速二次構建速度.
      new HardSourceWebpackPlugin({
        // cacheDirectory是在高速緩存寫入。默認情況下，將緩存存儲在node_modules下的目錄中
        cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        // Either an absolute path or relative to webpack's options.context.
        // Sets webpack's recordsPath if not already set.
        recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
        // configHash在啟動webpack實例時轉換webpack配置，
        // 並用於cacheDirectory為不同的webpack配置構建不同的緩存
        configHash: function(webpackConfig) {
          // node-object-hash on npm can be used to build this.
          return require('node-object-hash')({ sort: false }).hash(webpackConfig);
        },
        // 當加載器、插件、其他構建時腳本或其他動態依賴項發生更改時，
        // hard-source需要替換緩存以確保輸出正確。
        // environmentHash被用來確定這一點。如果散列與先前的構建不同，則將使用新的緩存
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json', 'yarn.lock'],
        },
        // An object. 控制來源
        info: {
          // 'none' or 'test'.
          mode: 'none',
          // 'debug', 'log', 'info', 'warn', or 'error'.
          level: 'debug',
        },
        // Clean up large, old caches automatically.
        cachePrune: {
          // Caches younger than `maxAge` are not considered for deletion. They must
          // be at least this (default: 2 days) old in milliseconds.
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // All caches together must be larger than `sizeThreshold` before any
          // caches will be deleted. Together they must be at least this
          // (default: 50 MB) big in bytes.
          sizeThreshold: 50 * 1024 * 1024,
        },
      }),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        {
          test: /.*\.DS_Store/,
        },
      ]),
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  filenameHashing: false,
  chainWebpack(config) {
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'));

    config.when(process.env.NODE_ENV === 'production', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
    });
  },
};
