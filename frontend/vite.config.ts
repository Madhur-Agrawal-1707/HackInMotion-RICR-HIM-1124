const { defineConfig } = require('vitest/config')
const react = require('@vitejs/plugin-react')

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/setupTests.ts',
    
    
    //environment: 'jsdom',
    //setupFiles: ['./src/setupTests.ts'],

  },
})
