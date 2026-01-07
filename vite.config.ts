import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

/*import {qrcode} from "vite-plugin-qrcode";
import svgr from "vite-plugin-svgr";
*/
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react-router-dom'],
  },
})
