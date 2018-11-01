<template>
    <div class="page-height">
         <breadcrumb 
       :key="$store.state.forceRender" 
       title="Council Information" 
      
       showBreadcrumb></breadcrumb>

    <v-container fill-height class="px-3 mt-5">
           <v-layout row wrap>
             
             <v-flex xs10 offset-xs1 class="text-xs-left">
               <h1 class="mb-1">{{title}} Fact Sheet</h1>
             </v-flex>

             <v-flex xs10 offset-xs1 id="page-content" >
                 <div v-html="content"></div>
             </v-flex>
             
      
    </v-layout>
    
         </v-container>
     

         
       
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: this.title + ' Fact Sheet'
    }
  },
  async asyncData({ params }) {
    let { data } = await axios.get(`wp/v2/councils?slug=${params.slug}`)
    return { data }
  },
  components: {
    Breadcrumb
  },
  computed: {
    title() {
      return this.data[0].title.rendered
    },
    content() {
      return this.data[0].content.rendered
    }
  }
}
</script>

<style scoped>
</style>