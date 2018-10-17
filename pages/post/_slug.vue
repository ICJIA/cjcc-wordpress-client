<template>
    <div>
      <breadcrumb/>
      {{$store.state.returnedContent}}
      
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { getMetaTitle, getMetaDescription } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  mounted() {},

  async fetch({ store, params, redirect, route }) {
    const request = {}
    request['apiUrl'] = config.getPostBySlug
    request['slug'] = params.slug
    request['route'] = route.path
    await store.dispatch('GET_CONTENT', request)
    if (store.state.returnedContent.length === 0) {
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
      title: this.$store.state.returnedContent.title.rendered
    }
  },

  watchQuery: true
}
</script>

<style scoped>
</style>