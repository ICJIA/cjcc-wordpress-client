<template>
  <v-app light>
    <no-ssr>
<outdated-browser></outdated-browser>
    </no-ssr>
    
    <v-content id="content">
      
      <navbar/>
      <no-ssr>
        
      </no-ssr>
       
          <nuxt/>
        
       <my-footer/>
     
    </v-content>
    
  </v-app>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar'
import MyFooter from '@/components/MyFooter'
import OutdatedBrowser from '@/components/OutdatedBrowser'
export default {
  components: {
    Breadcrumb,
    Navbar,
    MyFooter,
    OutdatedBrowser
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
  methods: {}
}
</script>

<style>
</style>
