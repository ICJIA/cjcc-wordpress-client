<template>
    <div >
        <breadcrumb 
       :key="$store.state.forceRender" 
       title="Contact" 
      
       showBreadcrumb></breadcrumb>
        <h1>Contact here</h1>
        
         
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
      return "Contact CJCC"
    }
  },
}

</script>

<style scoped>
</style>