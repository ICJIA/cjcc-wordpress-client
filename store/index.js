import axios from '~/plugins/axios'
import config from '@/config.js'
import find from 'lodash.find'
import findIndex from 'lodash.findindex'
import { getContentId, getApiUrlBySlug } from '@/utils.js'

export const state = () => ({
  routes: [],
  siteMeta: [],
  contentObject: [],
  contentCache: [],
  forceRender: 1,
  countyData: {},
  mapMetaData: {},
  blobCache: []
})

export const mutations = {
  setSiteMeta(state, siteMeta) {
    state.siteMeta = siteMeta
  },

  setRoutes(state) {
    state.routes = state.siteMeta.map(x => x.route)
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
  },
  setBlobs: (state, blobData) => {
    state.blobCache = blobData
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
    //console.log(payload)

    // Page content fetch
    if (config.contentCacheEnabled) {
      if (!find(state.contentCache, { id: payload.id })) {
        const { data } = await axios.get(payload.apiUrlBySlug + '&_embed')

        commit('setContent', data[0])
        commit('cacheContent', data[0])
        if (state.contentCache.length > config.contentCacheSize) {
          commit('removeFromCache')
          console.log('removeFromCache')
        }
        //console.log('new content -- not cached')
      } else {
        //console.log('cached content')
        const contentId = findIndex(state.contentCache, { id: payload.id })
        commit('setContent', state.contentCache[contentId])
      }
    } else {
      const { data } = await axios.get(payload.apiUrlBySlug)
      commit('setContent', data[0])
    }
  },

  async INITIALIZE_APP({ commit, state }) {
    const meta = await axios.get(config.getSiteMeta)
    const siteMeta = meta.data

    // For now, grab all blobs with content
    const b = await axios.get(config.getBlobMeta)
    const blobs = b.data
    commit('setSiteMeta', siteMeta)
    commit('setBlobs', blobs)
    commit('setRoutes')
    const data = await require(`~/assets/data/map.json`)
    commit('setMapMetaData', data)
  },

  async nuxtServerInit({ commit, dispatch }, { store, route, params }) {
    const meta = await axios.get(config.getSiteMeta)
    const siteMeta = meta.data
    const b = await axios.get(config.getBlobMeta)
    const blobs = b.data
    //console.log('Blobs: ', blobs)
    commit('setSiteMeta', siteMeta)
    commit('setBlobs', blobs)
    commit('setRoutes')

    const data = await require(`~/assets/data/map.json`)
    commit('setMapMetaData', data)
  },
  SET_COUNTY({ commit, state }, payload) {
    commit('setCounty', payload)
  }
}
