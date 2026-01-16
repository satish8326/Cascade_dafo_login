import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(),mkcert()],
  
  server: {
    https: true, // HTTPS is required for Azure Portal SPA redirect URIs
    port: 3000,
    strictPort: false, // Allow other ports if 3001 is in use
    host: true, // Allow external connections
  }
});
