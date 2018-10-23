<template>
  <v-app light>
    
    <v-content>
      <navbar/>
      <!-- <breadcrumb :key="$store.state.forceRender"></breadcrumb>
     

      <v-container fluid> -->
        <nuxt />
      <!-- </v-container> -->
    </v-content>
    
  </v-app>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar'
export default {
  components: {
    Breadcrumb,
    Navbar
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
