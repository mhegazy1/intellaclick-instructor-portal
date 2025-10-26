import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Main pages
        index: path.resolve(__dirname, 'pages/index.html'),
        login: path.resolve(__dirname, 'pages/login.html'),
        session: path.resolve(__dirname, 'pages/session.html'),
        display: path.resolve(__dirname, 'pages/display.html'),
        classes: path.resolve(__dirname, 'pages/classes.html'),
        'create-session': path.resolve(__dirname, 'pages/create-session.html'),
        'session-history': path.resolve(__dirname, 'pages/session-history.html'),
        'gamification-dashboard': path.resolve(__dirname, 'pages/gamification-dashboard.html'),
        'gamification-settings': path.resolve(__dirname, 'pages/gamification-settings.html')
      }
    }
  },
  server: {
    port: 5173,
    open: '/pages/login.html'
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'utils'),
      '@components': path.resolve(__dirname, 'components'),
      '@styles': path.resolve(__dirname, 'styles')
    }
  }
});
