const pkg = require('./package')
import axios from './plugins/axios'
import config from './config.js'
import webpack from 'webpack'

// generate routes for static generation
const getRoutes = async function() {
  // get API routes
  const { data } = await axios.get(config.getRoutes)
  // merge with static Nuxt routes
  const routes = [...data, ...config.dynamicRoutesToInclude]
  return routes
}

const getPublishedRoutes = async function() {
  // get API routes
  const { data } = await axios.get(config.getRoutes)
  // merge with static Nuxt routes
  const routes = [...data, ...config.dynamicRoutesToInclude]
  return routes
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
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#aaa' },

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
    // { src: '~/plugins/fusioncharts.js', ssr: false }
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

  modules: [['@nuxtjs/sitemap']],

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
