<template>
    <div class="page-height">

       <breadcrumb 
       :key="$store.state.forceRender" 
       :title="title" 
       :contentID="contentID"></breadcrumb>

    <splash></splash>

      <v-container fill-height class="" id="page-content" >
    <v-layout row wrap>

      
      
      <v-flex xs10 offset-xs1>
       
        
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
import Splash from '@/components/Splash'
import { handleClicks } from '@/mixins/handleClicks'

export default {
  mounted() {},
  mixins: [handleClicks],
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
    Splash
  },
  methods: {},
  data() {
    return {}
  },

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
    },
    content() {
      return this.$store.state.contentObject.content.rendered
    },
    splash() {
      if (this.$store.state.contentObject.featured_media === 0) {
        return false
      } else {
        return true
      }
    }
  },

  watchQuery: true
}
</script>

<style scoped>
</style>