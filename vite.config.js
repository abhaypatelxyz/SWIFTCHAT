import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/socket.io': {
          target:['http://localhost:3000','https://chat-box-server-4k6v.vercel.app/'],
          changeOrigin: true,
          secure: !isDevelopment, // Only disable secure in development mode
          ws: true, // Enable WebSocket proxying
        },
      },
    },
  };
});
