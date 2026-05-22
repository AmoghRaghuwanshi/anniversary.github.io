import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: Change '/anniversary/' to match your GitHub repo name
  base: '/anniversary.github.io/',
  plugins: [react(), tailwindcss()],
})
