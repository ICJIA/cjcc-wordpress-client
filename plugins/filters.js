import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('formatDate', val => format(val, 'MMMM Do, YYYY'))