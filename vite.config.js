import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/socket.io': {
          target: isDevelopment 
            ? 'http://localhost:3000' 
            : 'https://chat-box-server-4k6v.vercel.app/', // Choose the correct target based on the environment
          changeOrigin: true,
          secure: !isDevelopment, // Only disable secure in development mode
          ws: true, // Enable WebSocket proxying
        },
      },
    },
    // Ensure Vite serves the index.html from the root by default
    root: '.', // This sets the root directory where Vite looks for index.html
  };
});

