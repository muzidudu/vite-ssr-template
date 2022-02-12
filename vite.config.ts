import path from 'path'
import { defineConfig } from 'vite'
import viteSSR from 'vite-ssr/plugin.js'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '~~/': `${path.resolve(__dirname, 'src')}/`,
      '@@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    vue(),

    // https://github.com/frandiox/vite-ssr
    viteSSR(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue']
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head'],
      dts: 'src/typings/auto-imports.d.ts',
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/typings/components.d.ts'
    })
  ]
})
