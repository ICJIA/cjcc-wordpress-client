<template>
    <div class="page-height">
         <breadcrumb 
       :key="$store.state.forceRender" 
        :title="title" 
       type="Council"
       typeUrl = "/council"
      
       showBreadcrumb></breadcrumb>

    <v-container fill-height class="px-3 mt-5">
           <v-layout row wrap>
             
             <v-flex xs10 offset-xs1 class="text-xs-left">
               <h1 class="mb-5 title-rule">{{title | capitalize}} FACT SHEET</h1>
             </v-flex>

             <v-flex xs10 offset-xs1 id="page-content" >
                  <div v-html="content"  
        class="dynamic-content"
          @click="handleClicks"> </div>
             </v-flex>
             
      
    </v-layout>
    
         </v-container>
     

         
       
    </div>
</template>

<script>
import { pageComponents } from '@/mixins/pageComponents'
import Breadcrumb from '@/components/Breadcrumb'
import { buildRequest } from '@/utils.js'
import { handleClicks } from '@/mixins/handleClicks'
export default {
  mixins: [handleClicks, pageComponents],

  async fetch({ store, params, redirect, route }) {
    const request = buildRequest(store.state.siteMeta, route.path)

    if (request.id === undefined) {
      redirect(config.redirect404)
    } else {
      await store.dispatch('GET_CONTENT', request)
    }
    if (store.state.contentObject.length === 0) {
      return redirect(config.redirect404)
    }
  },
  components: {
    Breadcrumb
  },

  methods: {}
}
</script>

<style scoped>
</style>