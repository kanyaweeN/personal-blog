import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // แยก vendor libraries ออกมา
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000 // เพิ่ม limit ถ้าไม่อยากเห็น warning
  }
});
