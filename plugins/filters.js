import Vue from 'vue'
const ellipsize = require('ellipsize')
import { format } from 'date-fns'

Vue.filter('formatDate', val => format(val, 'MMMM Do, YYYY'))
Vue.filter('ellipsize', val => {
  return ellipsize(val, 45)
})
