<template>
   <div class="page-height">

     <breadcrumb 
       :key="$store.state.forceRender" 
       :title="title" 
       type="News"
       typeUrl = "/news"
       :contentID="contentID"></breadcrumb>

      
     
       <splash></splash>
       
    

   <v-container fill-height class="px-3" id="page-content">
    <v-layout row wrap>
      
      
      <v-flex xs10 offset-xs1 class="rule">
       
        
        <div v-html="content"  
        class="dynamic-content"
          @click="handleClicks"> </div>

      

       
 
      </v-flex>
    </v-layout>
    </v-container>


    

      
   </div>
</template>

<script>
import config from '@/config'
import { buildRequest } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'
import findIndex from 'lodash.findindex'
import { handleClicks } from '@/mixins/handleClicks'
import { pageComponents } from '@/mixins/pageComponents'
import Splash from '@/components/Splash'

export default {
  mounted() {},
  mixins: [handleClicks, pageComponents],

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

  data() {
    return {
      contentID: 0,
      displaySplash: false
    }
  },

  methods: {},

  components: {
    Breadcrumb,

    Splash
  },

  watchQuery: true
}
</script>

<style scoped>
</style>