module.exports = {
  lintOnSave:false,
  //配置代理解决跨域问题
  devServer: {
    proxy: {
      "/api": {
        target: "http://182.92.128.115",
        // pathRewrite: { "^/api": "" }
        changeOrigin: true,
      }
    }
  }
}