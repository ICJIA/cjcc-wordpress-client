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
  methods: {}
}
</script>

<style>
</style>
