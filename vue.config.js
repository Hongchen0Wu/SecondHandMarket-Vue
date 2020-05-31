module.exports = {
    devServer: {
        proxy: {
          "/api": {
            target: "http://localhost:9090",   // 要请求的后台地址
            ws: true,    // 启用websockets
            changeOrigin: true,    // 是否跨域
            pathRewrite: {   
              "^/api": "/"          // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
            }
          },
        //   "/log": {
        //     target: "http://192.168.0.201:12368",     // 另一个要请求的地址
        //     ws: true,
        //     changeOrigin: true,
        //     pathRewrite: {
        //       "^/log": "/"
        //     }
        //   }
        }
      }
}