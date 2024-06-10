import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV || 'development';


const env = loadEnv(mode, process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env,
  },
})
