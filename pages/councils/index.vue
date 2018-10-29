<template>
    <div>
         <breadcrumb 
       :key="$store.state.forceRender" 
       title="Criminal Justice Coordinating Councils"
       ></breadcrumb>

<no-ssr>
         <v-container fluid grid-list-md class="" id="about-ifvcc">
      <v-layout row wrap>

         <v-flex xs12 class="text-xs-center">
            <h1>Find a Criminal Justice Coordinating Council</h1>
         </v-flex>
         <v-flex xs10 offset-xs1 class="pb-5 mt-5">
           <div v-blob:councils-intro></div>
          </v-flex>
        <v-flex xs12 sm12 md6 order-sm2 order-xs2 order-md1 class="pt-3">

          <div id="chart-container-parent">
             
           <illinois/>
           
           
        </div>
        </v-flex>
        <v-flex xs12 sm12 md6 order-sm1 order-xs1 order-md2 class="pt-5" id="page-content">
        
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
import Illinois from '@/components/Illinois.vue'
import SelectCouncil from '@/components/SelectCouncil.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: {
    Illinois,
    SelectCouncil,
    Breadcrumb
  },
  head() {
    return {
      title: this.title
    }
  },
  computed: {
    title() {
      return 'Councils'
    }
  }
}
</script>

<style scoped>
.bottom-rule {
  border-bottom: 1px solid #ccc !important;
}
</style>