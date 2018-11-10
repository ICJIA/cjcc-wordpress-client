<template>
<div class="page-height">
<hero/>
   
 <div id="page-content">
<home-boxes/>


<home-about/>
</div>



  </div>
  
</template>

<script>
import Hero from '@/components/HeroSplit.vue'
import HomeBoxes from '@/components/HomeBoxes.vue'
import HomeAbout from '@/components/HomeAbout.vue'
import { mapGetters } from 'vuex'

export default {
  // async fetch({ store, params, redirect, route }) {
  //   if (store.state.siteMeta.length === 0) {
  //     await store.dispatch('INITIALIZE_APP')
  //   }
  // },
  methods: {},
  mounted() {},

  head() {
    return {
      title: 'Home'
    }
  },
  components: {
    Hero,
    HomeAbout,
    HomeBoxes
  },

  watchQuery: true
}
</script>
