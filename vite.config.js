/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 李中华
 * @Date: 2024-05-06 11:16:27
 * @LastEditTime: 2024-09-20 17:32:59
 */
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

  ],
  base: "./",
  // 路径配置
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // css预处理器
  css: {
  },
  build: {
    // cssCodeSplit:false,
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ["cesium"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          cesium: "cesium",
        },
        format: 'es',
      },
    },
    lib: {
      // 打包入口
      entry: "./src/index.ts",
      name: "index",
      fileName: "index",
    },
    // 输出路径
    outDir: "./dist",
  },
});
