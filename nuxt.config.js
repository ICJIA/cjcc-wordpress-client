const pkg = require('./package')
import axios from './plugins/axios'
import config from './config.js'
import webpack from 'webpack'

module.exports = {
  mode: 'universal',
  env: {
    clientURL: process.env.CLIENT_URL || 'http://localhost:5000',
    apiUrl: process.env.API_URL || 'http://wpdev:8888/wp-json/',
    frontPagePosts: process.env.FRONT_PAGE_POSTS || 3,
    redirect404: process.env.REDIRECT_404 || '/404.html',
    launchWebpackMonitor: process.env.LAUNCH_WEBPACK_MONITOR || false,
    getArticleBySlug: process.env.GET_ARTICLE_BY_SLUG || 'wp/v2/articles?slug=',
    getPostBySlug: process.env.GET_POST_BY_SLUG || 'wp/v2/posts?slug=',
    getPageBySlug: process.env.GET_PAGE_BY_SLUG || 'wp/v2/pages?slug=',
    getRoutes: process.env.GET_ROUTES || 'wp/v2/routes'
  },

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
    { src: '@/plugins/placeholder.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ,
    // Doc: https://bootstrap-vue.js.org/docs/
    [
      '@nuxtjs/webpackmonitor',
      {
        capture: true, // -> default 'true'
        target: '~.monitor/stats.json', // default -> '../monitor/stats.json'
        launch: config.launchWebpackMonitor,
        port: 4444, // default -> 8081
        excludeSourceMaps: true // default 'true'
      }
    ]
  ],

  generate: {
    // routes are pulled from WP API via custom endpoint
    routes: async function() {
      return await axios.get(config.getRoutes).then(res => {
        return res.data
      })
    }
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  }
}
