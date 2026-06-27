import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Tailwind CSS v4 uses a Vite plugin instead of PostCSS.
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
