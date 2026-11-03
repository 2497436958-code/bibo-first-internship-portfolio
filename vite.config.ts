import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // @ts-expect-error Vitest reads its project options from the Vite config at test time.
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/testSetup.ts'],
  },
});
