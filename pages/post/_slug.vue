<template>
   <div>

     
     
     <h1>{{$store.state.contentObject.title.rendered}}</h1>

    

     <div v-html="$store.state.contentObject.content.rendered"> </div>


     {{$store.state.contentObject}}

   
      
   </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { getContentId, getApiUrlBySlug } from '@/utils.js'

export default {
  mounted() {},

  async fetch({ store, params, redirect, route }) {
    const request = {}
    request['apiUrlBySlug'] = getApiUrlBySlug(store.state.siteMeta, route.path)
    request['id'] = getContentId(store.state.siteMeta, route.path)

    if (request.id === undefined) {
      redirect(config.redirect404)
    } else {
      await store.dispatch('GET_CONTENT', request)
    }

    if (store.state.contentObject.length === 0) {
      return redirect(config.redirect404)
    }
  },

  data() {
    return {}
  },

  head() {
    return {
      title: this.title
    }
  },
  computed: {
    title() {
      return this.$store.state.contentObject.title.rendered
        ? this.$store.state.contentObject.title.rendered
        : config.defaultPageTitle
    }
  },

  watchQuery: true
}
</script>

<style scoped>
</style>