<template>
     <div>

     <breadcrumb 
       :key="$store.state.forceRender" 
       title="News Archive" 
       type="News"
       typeUrl = "/news"
       showBreadcrumb="true"></breadcrumb>
     
     
   <h1>News archive here</h1>


    

      
   </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  data() {
    return {
      title: 'News'
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style scoped>
</style>