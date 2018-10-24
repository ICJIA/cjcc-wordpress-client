<template>
<div>
<hero/>
   
 
<home-boxes/>







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

import HomeBoxes from '@/components/HomeBoxes.vue'

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
    Hero,

    HomeBoxes
  },

  watchQuery: true
}
</script>
