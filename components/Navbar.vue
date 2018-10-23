<template>
    <div>
        

    <v-toolbar color="grey-lighten-4" class="nav headroom headroom--pinned" fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <nuxt-link to="/" class="nav-brand">
          <span class="nav-state">Illinois</span> |
          <span class="nav-name">LORUM IPSUM</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down main-nav">
        <v-btn flat nuxt-link to="/sample-page">Sample Page</v-btn>
        <v-btn flat nuxt-link to="/projects">News</v-btn>
        
        <v-btn flat nuxt-link to="/search">
          <i class="fas fa-search"></i>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>