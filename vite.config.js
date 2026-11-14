import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward enquiry submissions to the bundled Node backend during development
    proxy: { '/api': 'http://localhost:5174' },
  },
});
