const pkg = require('./package')
import axios from './plugins/axios'
import config from './config.js'
import webpack from 'webpack'
const sitemeta = require('./static/api/sitemeta.json')

// generate routes for static generation
const getRoutes = function() {
  const wordpressRoutes = sitemeta
    // remove blobs from routes
    .map(x => {
      if (x.type !== 'blob') {
        return x.route
      }
    })
    // remove undefined elements
    .filter(r => {
      return r !== undefined
    })
  return [...wordpressRoutes, ...config.dynamicRoutesToInclude]
}

module.exports = {
  mode: 'universal',
  env: {},

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'ILLINOIS CJCC | %s',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Illinois Criminal Justice Coordinating Councils'
      },
      {
        name: 'msapplication-TileColor',
        content: '#2b5797'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      { rel: 'icon', type: 'image/png', sizes: '', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1c6bc1' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:400,700,900'
      },
      {
        rel: 'stylesheet',
        href: 'https://pro.fontawesome.com/releases/v5.4.2/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: '/usil-js-map/map-style.css'
      }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.min.js'
      },
      {
        src: '/outdatedbrowser/outdatedbrowser.min.js',
        defer: true
      },
      {
        src: 'https://code.jquery.com/jquery-3.2.1.min.js',
        defer: true
      }
      // {
      //   src: '/usil-js-map/map-config.js',
      //   defer: true
      // },
      // {
      //   src: '/usil-js-map/map-interact.js',
      //   defer: true
      // }
    ]
  },

  /*
  ** Customize the progress-bar color
  */

  loading: {
    color: '#22327A',
    height: '2px'
  },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '~/plugins/filters.js',
    { src: '~plugins/vueinstantsearch', ssr: false }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: config.clientURL,
    cacheTime: 1000 * 60 * 15,
    gzip: false,
    generate: true,
    routes: async function() {
      return await getRoutes()
    }
  },

  modules: [
    ['@nuxtjs/sitemap'],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-10798495-30'
      }
    ]
  ],

  generate: {
    routes: async function() {
      return await getRoutes()
    }
  },
  router: {},
  build: {
    configureWebpack: {
      devtool: 'source-map'
    },
    extend(config, ctx) {}
  }
}
