import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://chat-box-server-nine.vercel.app',
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxying if using WebSockets
      },
    },
  },
});
