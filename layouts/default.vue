<template>
  <v-app light>
    
    <v-content id="content">
      <navbar/>
     
        <div>
          <nuxt/>
        </div>
       <my-footer/>
     
    </v-content>
    
  </v-app>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar'
import MyFooter from '@/components/MyFooter'
export default {
  components: {
    Breadcrumb,
    Navbar,
    MyFooter
  },
  scrollToTop: true,
  watch: {
    $route(to, from) {
      this.$store.commit('forceRender')
    }
  },
  data() {
    return {
      title: 'Vuetify.js'
    }
  },
  methods: {
    handleClicks($event) {
      // intercepts a tag clicks and routes within app
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
  }
}
</script>

<style>
</style>
