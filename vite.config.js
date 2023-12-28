import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/users': {
        target: 'https://usnc.dev-webdevep.ru/auth-back/api/v2/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, ''),
      },
    },
  },
})