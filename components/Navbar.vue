<template>
    <div>
        

   <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
      disable-resize-watcher
      
    >
   
     <v-list dense>
       <!-- <v-list subheader>
          <v-subheader style="font-weight: bold; text-transform: uppercase; font-size: 20px;" class="mt-2">Illinois | <span class="font-weight-light" style="color: #1A237E">&nbsp;CJCC</span></v-subheader>
       </v-list> -->
      
          <v-list-group
          v-model="expand" class="mt-2 pt-2">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Councils</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
              <v-list-tile v-for="council in councils" :key="council.text" @click="drawer = false" style="background: #fbfbfb">
              <v-list-tile-content @click.stop="pushRoute(council.link)">
                <v-list-tile-title>  {{ council.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            
            
          </v-list-group>
     
        <v-list-tile v-for="item in items" :key="item.text" @click="drawer = false">
         
         
          <v-list-tile-content @click.stop="pushRoute(item.link)">
            <v-list-tile-title>
              
              {{ item.text }}
               
            </v-list-tile-title>
          </v-list-tile-content>
        
        </v-list-tile>
      
       
      </v-list>

     
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <nuxt-link to="/" class="nav">
      <v-toolbar-title class=" text-uppercase">
        <span class="" style="color: #111; font-weight: 900">ILLINOIS</span> | 
        <span class="font-weight-light" style="color: #1A237E">{{navTitle}}</span>
      </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
       to="/search"
      >
        <span class="mr-2">Search</span>
        <v-icon>search</v-icon>
      </v-btn> -->
       <a href="http://www.icjia.state.il.us" style="margin-top: 4px">
      <img src="@/assets/img/logo-blue-filled.png" width="70">
       </a>
    </v-toolbar>

    </div>
</template>

<script>
export default {
  methods: {
    pushRoute(route) {
      this.drawer = false
      // this.expand = false
      this.$router.push({ path: route })
    }
  },
  computed: {
    navTitle() {
      if (this.$vuetify.breakpoint.xs) {
        return 'CJCC'
      } else {
        return 'Criminal Justice Coordinating Councils'
      }
    }
  },
  data() {
    return {
      drawer: false,
      expand: false,
      councils: this.$store.state.councilCache,
      items: [
        { text: 'News & Events', link: '/archive' },
        { text: 'Resources', link: '/resources' },
        { text: 'Planning', link: '/planning' },
        { text: 'Research', link: '/research' },
        { text: 'CCAC', link: '/ccac' },
        { text: 'Contact', link: '/contact' },
        { text: 'Search', link: '/search' }
      ],
      councils: [
        { text: 'Cook County', link: '/council/cook-county' },
        { text: 'Lake County', link: '/council/lake-county' },
        { text: 'McLean County', link: '/council/mclean-county' },
        { text: 'McHenry County', link: '/council/mchenry-county' },
        { text: 'St. Clair County', link: '/council/st-clair-county' },
        { text: 'Winnebago County', link: '/council/winnebago-county' }
      ]
    }
  }
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