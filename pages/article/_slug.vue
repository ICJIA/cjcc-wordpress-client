<template>
    <div>
      <breadcrumb/>
      {{$store.state.contentObject}}
      
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { getContentId } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  mounted() {},

  async fetch({ store, params, redirect, route }) {
    const request = {}
    request['apiUrl'] = config.getArticleBySlug
    request['slug'] = params.slug
    request['route'] = route.path
    request['id'] = getContentId(store.state.siteMeta, route.path)
    await store.dispatch('GET_CONTENT', request)
    if (store.state.contentObject.length === 0) {
      return redirect(config.redirect404)
    }
  },
  components: {
    Breadcrumb
  },
  data() {
    return {}
  },
  methods: {},
  head() {
    return {
      title: this.$store.state.contentObject.title.rendered
    }
  },

  watchQuery: true
}
</script>

<style scoped>
</style>