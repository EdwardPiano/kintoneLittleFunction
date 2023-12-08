import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:5000/login',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, '')
      },
      '/createRepair': {
        target: 'http://localhost:5000/createRepair',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/createRepair/, '')
      },
      '/getRepairData': {
        target: 'http://localhost:5000/getRepairData',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getRepairData/, '')
      },
      '/getAnnouncePics': {
        target: 'http://localhost:5000/getAnnouncePics',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getAnnouncePics/, '')
      }
    }
  }
})
