<template>
   <div>

     <breadcrumb 
       :key="$store.state.forceRender" 
       :title="$store.state.contentObject.title.rendered" 
       type="News"
       typeUrl = "/news"
       :contentID="contentID"></breadcrumb>
     
     
     <!-- <h1>{{$store.state.contentObject.title.rendered}}</h1>

    

     <div v-html="$store.state.contentObject.content.rendered"> </div>

  {{$store.state.contentObject}} -->

   <v-container fill-height class="px-3">
    <v-layout row wrap>

      <v-flex xs10 offset-xs1>

      <h1>{{$store.state.contentObject.title.rendered}}</h1>
      {{$store.state.contentObject.breadcrumb}}
      </v-flex>
      
      <v-flex xs10 offset-xs1>
       
        
        <div v-html="$store.state.contentObject.content.rendered"> </div>

       
 
      </v-flex>
    </v-layout>
    </v-container>


    

      
   </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { buildRequest } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'
import findIndex from 'lodash.findindex'

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

    this.request = request
  },
  created() {
    this.contentID = this.$store.state.contentObject.id
  },

  data() {
    return {
      contentID: 0
    }
  },

  head() {
    return {
      title: this.title
    }
  },
  methods: {},

  computed: {
    title() {
      return this.$store.state.contentObject.title.rendered
        ? this.$store.state.contentObject.title.rendered
        : config.defaultPageTitle
    }
  },
  components: {
    Breadcrumb
  },

  watchQuery: true
}
</script>

<style scoped>
</style>