import Vue from 'vue'

var Rollbar = require('vue-rollbar')
Vue.use(Rollbar, {
  accessToken: '48bc7d6beea34234957b3e622542ce6e',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  source_map_enabled: true,
  environment: 'production',
  payload: {
    client: {
      javascript: {
        code_version: '1.0'
      }
    }
  }
})
