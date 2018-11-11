<template>
    <div class="page-height">
         <breadcrumb 
       :key="$store.state.forceRender" 
        title="Find a Council" 
      
       ></breadcrumb>

<no-ssr>
         <v-container fluid grid-list-md class="" id="page-content">
      <v-layout row wrap>

         <v-flex xs12 class="text-xs-center">
            <h1>Find a Criminal Justice Coordinating Council</h1>
         </v-flex>
         <v-flex xs10 offset-xs1 class="pb-5 mt-5">

           
           <div v-html="blob('councils-intro')" class="dynamic-content"
          @click="handleClicks"></div>
          </v-flex>
        <v-flex xs12 sm12 md4 hidden-sm-and-down order-sm2 order-xs2 order-md1 class="pt-3">

         
             
           <illinois/>
           
           
      
        </v-flex>
        <v-flex xs12 sm12 md8 order-sm1 order-xs1 order-md2 class="pt-5" id="page-content">
        
          <div >
            <select-council/>
          </div>

         
        </v-flex>

      </v-layout>
    </v-container>
    </no-ssr>
    </div>
</template>

<script>
import { blob } from '@/mixins/blob'
import Illinois from '@/components/Illinois.vue'
import SelectCouncil from '@/components/SelectCouncil.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import config from '@/config'
export default {
  components: {
    Illinois,
    SelectCouncil,
    Breadcrumb
  },
  mixins: [blob],
  head() {
    return {
      title: 'Find a Council',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find an Illinois Criminal Justice Coordinating Council'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.permalink
        }
      ]
    }
  },
  computed: {
    title() {
      return 'Councils'
    },
    permalink() {
      return config.clientURL + 'council'
    },
    displayMap() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
.bottom-rule {
  border-bottom: 1px solid #ccc !important;
}
</style>