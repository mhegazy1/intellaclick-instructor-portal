import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Main pages
        index: path.resolve(__dirname, 'index.html'),
        login: path.resolve(__dirname, 'login.html'),
        classes: path.resolve(__dirname, 'classes.html'),
        quizzes: path.resolve(__dirname, 'quizzes.html'),
        'saved-questions': path.resolve(__dirname, 'saved-questions.html'),
        session: path.resolve(__dirname, 'session.html'),
        display: path.resolve(__dirname, 'display.html'),
        'create-session': path.resolve(__dirname, 'create-session.html'),
        'session-history': path.resolve(__dirname, 'session-history.html'),
        roster: path.resolve(__dirname, 'roster.html'),
        analytics: path.resolve(__dirname, 'analytics.html'),
        'gamification-dashboard': path.resolve(__dirname, 'gamification-dashboard.html'),
        'gamification-settings': path.resolve(__dirname, 'gamification-settings.html'),
        'gamification-sync': path.resolve(__dirname, 'gamification-sync.html'),
        'student-profile': path.resolve(__dirname, 'student-profile.html'),
        'active-sessions': path.resolve(__dirname, 'active-sessions.html'),
        'forgot-password': path.resolve(__dirname, 'forgot-password.html')
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
