import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
dotenv.config()


export default defineConfig({
  plugins: [
    vue(),
  ],
  define:{
    'process.env' : process.env
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
