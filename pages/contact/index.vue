<template>
    <div >
        <breadcrumb 
       :key="$store.state.forceRender" 
       title="Search" 
       type="page"
       typeUrl = "/news"
       showBreadcrumb></breadcrumb>
        <h1>Contact here</h1>
        
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
  }
}
</script>

<style scoped>
</style>