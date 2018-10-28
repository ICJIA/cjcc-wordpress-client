<template>
    <div>
        

   <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      disable-resize-watcher
      
    >
      <v-list>
        <v-list-tile v-for="item in items" :key="item.text" @click="drawer = false">
         
         
          <v-list-tile-content @click.stop="pushRoute(item.link)">
            <v-list-tile-title>
              
              {{ item.text }}
               
            </v-list-tile-title>
          </v-list-tile-content>
        
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">OTHER ICJIA SITES</v-subheader>
       
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <nuxt-link to="/" class="nav">
      <v-toolbar-title class=" text-uppercase">
        <span class="font-weight-black">ILLINOIS</span> | 
        <span class="font-weight-light" style="color: #1A237E">CRIMINAL JUSTICE COORDINATING COUNCILS</span>
      </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-btn
        flat
       to="/search"
      >
        <span class="mr-2">Search</span>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    </div>
</template>

<script>
export default {
  methods: {
    pushRoute(route) {
      this.drawer = false
      this.$router.push({ path: route })
    }
  },
  data: () => ({
    drawer: false,
    items: [
      { icon: 'trending_up', text: 'Councils', link: '/councils' },
      { icon: 'subscriptions', text: 'News', link: '/archive' },
      { icon: 'history', text: 'Resources', link: '/resources' },
      { icon: 'featured_play_list', text: 'Planning', link: '/planning' },
      { icon: 'watch_later', text: 'Research', link: '/research' },
      { icon: 'featured_play_list', text: 'CCAC', link: '/ccac' },
      { icon: 'watch_later', text: 'Contact', link: '/contact' },
      { icon: 'watch_later', text: 'Search', link: '/search' }
    ]
  })
}
</script>

<style scoped>
.nav-state {
  font-weight: 900;
}

a {
  text-decoration: none;
}
</style>