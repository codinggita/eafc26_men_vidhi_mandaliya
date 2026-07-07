import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
      '/admin': 'http://localhost:5000',
      '/analytics': 'http://localhost:5000',
      '/stats': 'http://localhost:5000',
      '/search': 'http://localhost:5000',
      '/players': 'http://localhost:5000',
    }
  }
})
