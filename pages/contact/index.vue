<template>
    <div >
        <breadcrumb 
       :key="$store.state.forceRender" 
       title="Contact" 
      
       showBreadcrumb></breadcrumb>
        <v-container fill-height class="px-3"   >
    <v-layout row wrap>
      
      <v-flex xs10 offset-xs1>
        <h1>Contact here</h1>
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
      title: this.title
    }
  },
  computed: {
    title() {
      return 'Contact CJCC'
    }
  }
}
</script>

<style scoped>
</style>