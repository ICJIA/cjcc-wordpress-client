const pkg = require('./package')
import axios from './plugins/axios'
import config from './config.js'
import webpack from 'webpack'

// generate routes for sitemap and static generation
const getRoutes = async function() {
  // get API routes
  const { data } = await axios.get(config.getRoutes)
  // merge with static Nuxt routes
  const routes = [...data, ...config.staticRoutes]
  return routes
}

module.exports = {
  mode: 'universal',
  // env: {
  //   clientURL: process.env.CLIENT_URL || 'http://localhost:5000',
  //   apiUrl: process.env.API_URL || 'http://wpdev:8888/wp-json/',
  //   frontPagePosts: process.env.FRONT_PAGE_POSTS || 3,
  //   redirect404: process.env.REDIRECT_404 || '/404.html',
  //   launchWebpackMonitor: process.env.LAUNCH_WEBPACK_MONITOR || false,
  //   getSiteMeta: process.env.GET_SITE_META || 'wp/v2/sitemeta/',
  //   getRoutes: process.env.GET_ROUTES || 'wp/v2/routes',
  //   contentCacheEnabled: process.env.CONTENT_CACHE_ENABLED || true,
  //   contentCacheSize: process.env.CONTENT_CACHE_SIZE || 10,
  //   defaultPageTitle: process.env.DEFAULT_PAGE_TITLE || 'CJCC'
  // },

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'ILLINOIS CJCC | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
      }
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.0.8/js/all.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.min.js'
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
    { src: '~/plugins/fusioncharts.js', ssr: false },
    { src: '~/plugins/blob.js', ssr: false }
    // { src: '~/plugins/rollbar.js', ssr: false }
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://cjcc.netlify.com',
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
    extend(config, ctx) {}
  }
}
