import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://54.234.56.197:5000/login',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, '')
      },
      '/createRepair': {
        target: 'http://54.234.56.197:5000/createRepair',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/createRepair/, '')
      },
      '/getRepairData': {
        target: 'http://54.234.56.197:5000/getRepairData',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getRepairData/, '')
      },
      '/getAnnouncePics': {
        target: 'http://54.234.56.197:5000/getAnnouncePics',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getAnnouncePics/, '')
      }
    }
  }
})
