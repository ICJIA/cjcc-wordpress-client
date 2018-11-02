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
  mapMetaData: {},
  blobCache: [],
  councilCache: []
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
  },
  setCouncils: (state, councilData) => {
    state.councilCache = councilData
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
    // get councils
    let c = await axios.get(config.getCouncilMeta)
    const councils = c.data
    commit('setCouncils', councils)
    commit('setSiteMeta', siteMeta)
    commit('setBlobs', blobs)
    commit('setRoutes')
    const data = await require(`~/assets/data/map.json`)
    commit('setMapMetaData', data)
  },

  async nuxtServerInit(
    { commit, dispatch },
    { store, route, isServer, params, redirect }
  ) {
    //get sitemeta
    const meta = await axios.get(config.getSiteMeta)
    const siteMeta = meta.data
    // get blobs
    const b = await axios.get(config.getBlobMeta)
    const blobs = b.data
    //get councils
    let c = await axios.get(config.getCouncilMeta)
    const councils = c.data
    //console.log(councils)
    commit('setSiteMeta', siteMeta)
    commit('setBlobs', blobs)
    commit('setCouncils', councils)
    commit('setRoutes')

    const data = await require(`~/assets/data/map.json`)
    commit('setMapMetaData', data)

    // console.log('isServer? ', process.server)
    // console.log('Slug: ', params.slug)

    console.log('Route: ', route.path.split('/'))

    if (process.server && params.slug) {
      const request = buildRequest(store.state.siteMeta, route.path)
      if (request.id === undefined) {
        redirect(config.redirect404)
      } else {
        const { data } = await axios.get(request.apiUrlBySlug)
        commit('setContent', data[0])
        console.log('Fetching data on server.')
      }
    }
  },
  SET_COUNTY({ commit, state }, payload) {
    commit('setCounty', payload)
  }
}
