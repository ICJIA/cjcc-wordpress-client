<template>
    <div >
        <breadcrumb 
       :key="$store.state.forceRender" 
       title="Search" 
       type="page"
       typeUrl = "/news"
       showBreadcrumb></breadcrumb>
        <h1>Search here</h1>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
  }
}
</script>

<style scoped>
</style>