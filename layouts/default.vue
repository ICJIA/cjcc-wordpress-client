<template>
  <v-app light>
    
    <v-content>
      
      <breadcrumb :key="$store.state.forceRender"></breadcrumb>
     

      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
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
