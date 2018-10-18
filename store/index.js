import axios from '~/plugins/axios'
import config from '@/config.js'
import find from 'lodash.find'
import findIndex from 'lodash.findindex'
export const state = () => ({
  routes: [],
  siteMeta: [],
  posts: [],
  pages: [],
  articles: [],
  contentObject: [],
  contentCache: []
})

export const mutations = {
  setSiteMeta(state, siteMeta) {
    state.siteMeta = siteMeta
  },
  setPosts(state) {
    const posts = state.siteMeta.filter(x => {
      return x.type === 'post'
    })
    state.posts = posts
  },

  setPages(state) {
    const pages = state.siteMeta.filter(x => {
      return x.type === 'page'
    })
    state.pages = pages
  },

  setArticles(state) {
    const articles = state.siteMeta.filter(x => {
      return x.type === 'article'
    })
    state.articles = articles
  },
  setRoutes(state) {
    const routes = state.siteMeta.map(x => x.route)
    state.routes = routes
  },
  setContent(state, data) {
    state.contentObject = data
    // If the page is already cached, don't re-cache
    // if (!find(state.contentCache, { id: data.id })) {
    //state.contentCache.push(data)
    // }
  },
  cacheContent(state, data) {
    state.contentCache.push(data)
  }
}

export const actions = {
  async GET_CONTENT({ commit, state }, payload) {
    console.log(payload)
    if (!find(state.contentCache, { id: payload.id })) {
      const { data } = await axios.get(payload.apiUrl + payload.slug)
      commit('setContent', data[0])
      commit('cacheContent', data[0])
      console.log('not found -- call axios')
    } else {
      console.log('found -- pull from cache')
      const contentId = findIndex(state.contentCache, { id: payload.id })
      commit('setContent', state.contentCache[contentId])
    }
  },

  async nuxtServerInit({ commit }, { store, route, params }) {
    const meta = await axios.get('wp/v2/sitemeta/')
    const siteMeta = meta.data

    commit('setSiteMeta', siteMeta)
    commit('setPosts')
    commit('setPages')
    commit('setArticles')
    commit('setRoutes')
  }
}
