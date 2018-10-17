<template>
  <v-app light>
    
    <v-content>
      <router-link to="/">Home</router-link> | 
      <router-link to="/post/test">Post Test</router-link> | 
       <router-link to="/article/article-title-number-2">Article 2</router-link> | 
        <router-link to="/sample-page">Sample Page</router-link>

      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js'
    }
  }
}
</script>
