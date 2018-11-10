import axios from 'axios'
const config = require('../config')

export default axios.create({
  baseURL: config.apiUrl
})
