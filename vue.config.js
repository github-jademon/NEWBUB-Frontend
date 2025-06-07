const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true, // 의존성 트랜스파일
  devServer: {
    proxy: {
      "/api": {
        // target: "http://192.168.31.157:8000", // 실제 API 서버 URL
        target: "http://127.0.0.1:8000", // 실제 API 서버 URL
        changeOrigin: true, // CORS 헤더를 수정하여 요청을 보냄
        pathRewrite: {
          "^/api": "", // /api를 제거하고 요청
        },
      },
    },
  },
});
