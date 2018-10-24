<template>
    <div>
          <breadcrumb 
       :key="$store.state.forceRender" 
       title="Select Council" 
       showBreadcrumb></breadcrumb>


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
  }
}
</script>

<style scoped>
</style>