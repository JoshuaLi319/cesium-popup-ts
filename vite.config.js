/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 李中华
 * @Date: 2024-05-06 11:16:27
 * @LastEditTime: 2024-09-25 16:43:26
 */
import { defineConfig } from "vite";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    terser({
      compress: {
        drop_console: true, // 关闭所有的 console.log 打印
      },
    }),
  ],
  base: "./",
  // 路径配置
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // css预处理器
  css: {},
  build: {
    // cssCodeSplit:false,
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["cesium"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          cesium: "Cesium",
        },
        format: "es",
      },
    },
    lib: {
      // 打包入口
      entry: "./src/index.ts",
      formats:['es','cjs','umd'],
      name: "CesiumPopup", // 暴露的全局变量,在umd模式下生效
      fileName: "index",
    },
    // 输出路径
    outDir: "./dist",
  },
});
