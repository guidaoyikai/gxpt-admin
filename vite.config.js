import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/admin': {
        target: "http://127.0.0.1",
        changeOrigin: true
      },
      '/uploads': {
        target: "http://127.0.0.1",
        changeOrigin: true
      },
    }
  },

  plugins: [
    vue(),
    AutoImport({
      resolvers:[
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),

    Components({
      resolvers:[
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections:['ep']
        })
      ]
    }),
    Icons({
      autoInstall:true,
    })
  ],

  resolve:{
    alias:
      {
        "@": path.join(__dirname, 'src')
      }
  }
})
