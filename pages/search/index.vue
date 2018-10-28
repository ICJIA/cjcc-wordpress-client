<template>
    <div >
       <breadcrumb 
       :key="$store.state.forceRender" 
       title="CJCC Search" 
      
       showBreadcrumb></breadcrumb>
        <h1>Search here</h1>
        
          <spacer></spacer>
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
  methods: {},

  
}
</script>

<style scoped>
</style>