import axios from '~/plugins/axios'
import config from '@/config.js'
import find from 'lodash.find'
import findIndex from 'lodash.findindex'
import { buildRequest } from '@/utils.js'

export const state = () => ({
  routes: [],
  siteMeta: [],
  contentObject: [],
  contentCache: [],
  forceRender: 1,
  countyData: {},
  mapMetaData: {}
})

export const mutations = {
  setSiteMeta(state, siteMeta) {
    state.siteMeta = siteMeta
  },

  setRoutes(state, routes) {
    state.routes = routes
  },
  setContent(state, data) {
    state.contentObject = data
  },
  cacheContent(state, data) {
    state.contentCache.push(data)
  },
  removeFromCache(state) {
    state.contentCache.shift()
  },
  forceRender(state) {
    state.forceRender++
  },
  setCounty(state, countyData) {
    state.countyData = countyData
  },
  setMapMetaData: (state, mapMetaData) => {
    state.mapMetaData = mapMetaData
  }
}

export const getters = {
  getFrontPageNews: state => {
    const posts = state.siteMeta
      .filter(post => post.type === 'post')
      .slice(0, config.frontPagePosts)
    return posts
  },
  getAllNews: state => {
    return state.siteMeta.filter(post => post.type === 'post')
  }
}

export const actions = {
  async GET_CONTENT({ commit, state }, payload) {
    try {
      const content = require(`@/api${payload.route}/index.json`)
      console.log('Content: ', content)
      commit('setContent', content[0])
    } catch (e) {
      commit('setContent', `Error fetching content: ${e}`)
    }
  },

  async INITIALIZE_APP({ commit, state }) {
    const sitemeta = await require('@/api/sitemeta.json')
    commit('setSiteMeta', sitemeta)

    const data = await require(`~/assets/data/map.json`)
    commit('setMapMetaData', data)

    const routes = store.state.siteMeta
      // remove blobs
      .map(x => {
        if (x.type !== 'blob') {
          return x.route
        }
      })
      // remove undefined elements
      .filter(r => {
        return r !== undefined
      })

    commit('setRoutes', routes)
  },

  async nuxtServerInit(
    { commit, dispatch },
    { store, route, params, redirect }
  ) {
    const sitemeta = await require('@/api/sitemeta.json')
    commit('setSiteMeta', sitemeta)

    const data = await require(`~/assets/data/map.json`)
    commit('setMapMetaData', data)

    const routes = store.state.siteMeta
      // remove blobs
      .map(x => {
        if (x.type !== 'blob') {
          return x.route
        }
      })
      // remove undefined elements
      .filter(r => {
        return r !== undefined
      })

    commit('setRoutes', routes)
  },
  SET_COUNTY({ commit, state }, payload) {
    commit('setCounty', payload)
  }
}
