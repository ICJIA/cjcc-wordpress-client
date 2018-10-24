<template>
<div>
<hero/>
   
 
<home-boxes/>



 <v-container fluid grid-list-md class="pl-5 pr-5 mt-5 mb-5 mt-5" id="about-ifvcc">
      <v-layout row wrap>
        <v-flex xs12 sm12 md6 hidden-sm-and-down>

          <div id="chart-container">
           <illinois/>
           
        </div>
        </v-flex>
        <v-flex xs12 sm12 md6>
        
          <div >
            <select-council/>
          </div>

         
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
import Illinois from '@/components/Illinois.vue'
import SelectCouncil from '@/components/SelectCouncil.vue'
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
    Illinois,
    SelectCouncil,
    HomeBoxes
  },

  watchQuery: true
}
</script>
