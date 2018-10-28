<template>
    <article>

       <breadcrumb 
       :key="$store.state.forceRender" 
       :title="$store.state.contentObject.title.rendered" 
       :contentID="contentID"></breadcrumb>
     

      <v-container fill-height class="px-3">
    <v-layout row wrap>

      <v-flex xs10 offset-xs1>

      <h1>{{$store.state.contentObject.title.rendered}}</h1>
      
      </v-flex>
      
      <v-flex xs10 offset-xs1>
       
        
        <div v-html="$store.state.contentObject.content.rendered"> </div>

       
 
      </v-flex>
    </v-layout>
    </v-container>
     
    </article>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { buildRequest } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'


export default {
  mounted() {},

  async fetch({ store, params, redirect, route }) {
    const request = buildRequest(store.state.siteMeta, route.path)

    if (request.id === undefined) {
      redirect(config.redirect404)
    } else {
      await store.dispatch('GET_CONTENT', request)
    }

    if (store.state.contentObject.length === 0) {
      return redirect(config.redirect404)
    }
  },
  components: {
    Breadcrumb,
    
  },
  data() {
    return {}
  },
  methods: {},
  head() {
    return {
      title: this.title
    }
  },
  created() {
    this.contentID = this.$store.state.contentObject.id
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