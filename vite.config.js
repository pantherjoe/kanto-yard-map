import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
base: '/kanto-yard-map/',

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
