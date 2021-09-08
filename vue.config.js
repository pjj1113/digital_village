const path = require("path");
const resolve = function (dir) {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"));
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    host: "0.0.0.0",
    port: "8080",
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true,
    },
    proxy: {
      ['/api']: {
        target: `http://127.0.0.1:3001`,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^/api']: ''
        }
      }
    },
  },
};
