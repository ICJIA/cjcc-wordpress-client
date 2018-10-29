<template>
    <div >
        <breadcrumb 
       :key="$store.state.forceRender" 
       title="CJCC Search" 
      
       showBreadcrumb></breadcrumb>
        <v-container fill-height class="px-3"   >
    <v-layout row wrap>
      
      <v-flex xs10 offset-xs1>
        <h1>Algolia Search here</h1>
      </v-flex>
    </v-layout>
        </v-container>
        
         
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Spacer from '@/components/Spacer'
export default {
  components: {
    Breadcrumb,
    Spacer
  },
  head() {
    return {
      title: 'Search'
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>