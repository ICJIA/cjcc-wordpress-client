<template>
   <div>

     <breadcrumb 
       :key="$store.state.forceRender" 
       :title="title" 
       type="News"
       typeUrl = "/archive"
       :contentID="contentID"></breadcrumb>

      
     <div v-if="splash">
       <splash :contentID="contentID"></splash>
       </div>
    


   <v-container fill-height class="px-3">
    <v-layout row wrap>

      <v-flex xs10 offset-xs1>
       

      <h1>{{title}}</h1>
      
      </v-flex>
      
      <v-flex xs10 offset-xs1>
       
        
        <div v-html="content"> </div>

      

       
 
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
import Spacer from '@/components/Spacer'
import Splash from '@/components/Splash'

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
      contentID: 0,
      displaySplash: false
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
    },
    splash() {
      if (this.$store.state.contentObject.featured_image_src === 0) {
        return false
      } else {
        return true
      }
    },
    content() {
      return this.$store.state.contentObject.content.rendered
    }
  },

  components: {
    Breadcrumb,
    Spacer,
    Splash
  },

  watchQuery: true
}
</script>

<style scoped>
</style>