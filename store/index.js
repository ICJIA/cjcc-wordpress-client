import axios from '~/plugins/axios'

export const state = () => ({
  routes: [],
  siteMeta: [],
  posts: [],
  pages: [],
  articles: []
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
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const meta = await axios.get('wp/v2/sitemeta/')
    const siteMeta = meta.data

    commit('setSiteMeta', siteMeta)
    commit('setPosts')
    commit('setPages')
    commit('setArticles')
    commit('setRoutes')
  }
}
