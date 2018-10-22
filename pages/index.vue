<template>
  <v-layout
    >
   
    <v-flex xs12 sm6>
       <div v-for="item in $store.state.siteMeta" :key="item.id" style="margin-bottom: 10px">
      <v-card>
       

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
      </div>
    </v-flex>
 
  </v-layout>
</template>

<script>
const unescape = require('lodash.unescape')
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

  watchQuery: true
}
</script>
