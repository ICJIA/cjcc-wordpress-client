import Vue from 'vue'
const ellipsize = require('ellipsize')
import { format } from 'date-fns'

Vue.filter('formatDate', val => format(val, 'MMMM Do, YYYY'))
Vue.filter('ellipsize', (val, chars = 50) => {
  return ellipsize(val, chars)
})
Vue.filter('capitalize', val => val.toUpperCase())
