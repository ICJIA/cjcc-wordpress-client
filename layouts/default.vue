<template>
  <v-app light>
    
    <v-content id="content">
      <navbar/>
     
        <div>
          <nuxt id="page-content" />
        </div>
        <my-footer></my-footer>
     
    </v-content>
    
  </v-app>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar'
import MyFooter from '@/components/Footer'
export default {
  components: {
    Breadcrumb,
    Navbar,
    MyFooter
  },
  watch: {
    $route(to, from) {
      this.$store.commit('forceRender')
    }
  },
  data() {
    return {
      title: 'Vuetify.js'
    }
  }
}
</script>

<style>

</style>
