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
import axios from '@/plugins/axios'
import config from '@/config'
import { buildRequest } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'
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
  },
  components: {
    Breadcrumb,
    Splash
  },
  data() {
    return {}
  },
  methods: {
    handleClicks($event) {
      const { target } = $event
      // handle only links that occur inside the component and do not reference external resources
      if (
        target &&
        target.matches(".dynamic-content a:not([href*='://'])") &&
        target.href
      ) {
        // some sanity checks taken from vue-router:
        // https://github.com/vuejs/vue-router/blob/dev/src/components/link.js#L106
        const {
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          button,
          defaultPrevented
        } = $event
        // don't handle with control keys
        if (metaKey || altKey || ctrlKey || shiftKey) return
        // don't handle when preventDefault called
        if (defaultPrevented) return
        // don't handle right clicks
        if (button !== undefined && button !== 0) return
        // don't handle if `target="_blank"`
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute('target')
          if (/\b_blank\b/i.test(linkTarget)) return
        }
        // don't handle same page links/anchors
        const url = new URL(target.href)
        const to = url.pathname
        if (window.location.pathname !== to && $event.preventDefault) {
          $event.preventDefault()
          this.$router.push(to)
        }
      }
    }
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