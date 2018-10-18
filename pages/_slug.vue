<template>
    <div>
     
      <h1>{{$store.state.contentObject.title.rendered}}</h1>

     <div v-html="$store.state.contentObject.content.rendered"> </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { getContentId } from '@/utils.js'

export default {
  mounted() {},

  async fetch({ store, params, redirect, route }) {
    const request = {}
    request['apiUrl'] = config.getPageBySlug
    request['slug'] = params.slug
    request['route'] = route.path
    request['id'] = getContentId(store.state.siteMeta, route.path)
    await store.dispatch('GET_CONTENT', request)
    if (store.state.contentObject.length === 0) {
      return redirect(config.redirect404)
    }
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