
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:8000',
  },
},

})