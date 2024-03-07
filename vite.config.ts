import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'Notes',
      short_name: 'Notes',
      description: 'Keep track of things with virtual sticky notes',
      theme_color: '#fcffcc',
      background_color: '#dbdbdb',
      icons: [
        {
          src: 'logo192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'logo512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  base: "/Notes/"
})
