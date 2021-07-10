import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport from "vite-plugin-style-import";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //按需引入
    // styleImport({
    //     libs: [
    //         {
    //             libraryName: 'vant',
    //             esModule: true,
    //             resolveStyle: (name) => `vant/es/${name}/style`,
    //         },
    //     ],
    // }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      src: resolve(__dirname, "src"),
      com: resolve(__dirname, "src/components"),
    },
  },
  base: "/",
  server: {
    //port: 4000, // 设置服务启动端口号
    //open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      "^/v1/.*": {
        target: "http://elm.cangdu.org",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1/, 'http://localhost:3000/v1')
      },
      "^/v2/.*": {
        target: "http://elm.cangdu.org",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1/, 'http://localhost:3000/v1')
      },
      "^/shopping/.*": {
        target: "http://elm.cangdu.org",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1/, 'http://localhost:3000/v1')
      },
      "^/v4/.*": {
        target: "http://elm.cangdu.org",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1/, 'http://localhost:3000/v1')
      },
      "^/bos/.*": {
        target: "http://elm.cangdu.org",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1/, 'http://localhost:3000/v1')
      },
      "^/img/.*": {
        target: "http://elm.cangdu.org/img/",
        ws: true,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1/, 'http://localhost:3000/v1')
      },
    },
  },
});
