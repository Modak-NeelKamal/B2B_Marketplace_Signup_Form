import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/B2B_Marketplace_Signup_Form",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
