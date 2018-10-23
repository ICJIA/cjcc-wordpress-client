<template>
<div>
  <!-- <v-card>
      <v-responsive :aspect-ratio="16/9" :max-height="400" style="background: #ccc">
        <v-card-text class="text-xs-center">
          Splash image here
        </v-card-text>
      </v-responsive>
    </v-card> -->
    <hero/>
   
    <v-container fill-height fluid class="px-0" style="margin-top: -25px">
    <v-layout row wrap>
       <v-flex xs4>
        <v-card dark color="blue-grey darken-4" height="100%" class=" pt-3 pb-3">
         
         <h2 class="text-xs-center">Test Title 1</h2>
        
          <v-card-text class="px-3">
            <no-ssr>
            <dummy text="50"></dummy>
            </no-ssr>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark color="blue-grey darken-4" height="100%" class=" pt-3 pb-3">
           <h2 class="text-xs-center">Test Title 2</h2>
          <v-card-text class="px-3">
               <no-ssr>
            <dummy text="50"></dummy>
            </no-ssr>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark color="blue-grey darken-4" height="100%" class=" pt-3 pb-3">
           <h2 class="text-xs-center">Test Title 3</h2>
          <v-card-text class="px-3">
               <no-ssr>
            <dummy text="50"></dummy>
            </no-ssr>
          </v-card-text>
        </v-card>
      </v-flex>
       
    </v-layout>
  </v-container>




<v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs4 v-for="item in $store.state.siteMeta" :key="item.id">
       <v-card height="100%"> 
       
        <v-card-title primary-title>
          <div>
            <router-link :to="item.route">
              <h3 class="headline mb-0">{{ item.title}}</h3>
            </router-link>
            <div>{{ item.type}}</div>
            <div>{{ item.excerpt}}</div>
          </div>
        </v-card-title>

       
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
export default {
  async fetch({ store, params, redirect, route }) {
    if (store.state.siteMeta.length === 0) {
      await store.dispatch('INITIALIZE_APP')
    }
  },
  methods: {},

  head() {
    return {
      title: 'Home'
    }
  },
  components: {
    Hero
  },

  watchQuery: true
}
</script>
