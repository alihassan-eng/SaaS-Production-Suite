import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 1. Integration Matrix: Mapping the next-gen Tailwind CSS v4 Oxide engine cleanly
  plugins: [tailwindcss()],

  // 2. Local Hardware Server Rules: Securing runtime ports from overlapping threads
  server: {
    port: 5173,
    strictPort: true, // If port 5173 is busy, freeze execution instead of shifting to another port
    host: true, // Expose the server to the local area network natively
  },

  // 3. Rollup Production Ingestion Core
  build: {
    target: 'esnext', // Target advanced modern hardware browsers for zero transpilation lag
    minify: 'esbuild', // Force high-speed esbuild optimizer to compress the final binary payload
    sourcemap: false, // Disable tracking map files to secure the production architecture source codes
  },
});
