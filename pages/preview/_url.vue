<template>
    <div class="page-height">
      
      <v-container style="margin-top: 30px">
       <!-- <div v-html="previewContentObject.content.rendered"></div>-->
       <div v-if="error"><center>
         
         <v-alert
      :value="true"
      type="error"
    >
      Error:<br>{{errMsg}}
    </v-alert>
         </center>
         </div> 
         
         <div v-else>
           
           <h1>{{title}}</h1>
           
           <span v-html="content"></span>
           </div>
      </v-container>
        
    </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  async mounted() {
    if (!this.$route.query.url) {
      this.error = true
      this.errMsg = 'Must specify URL'
    } else {
      try {
        const { data } = await axios.get(this.$route.query.url)
        this.previewContentObject = data
        this.error = false
        this.content = this.previewContentObject.content.rendered
        this.title = this.previewContentObject.title.rendered
      } catch (err) {
        // console.error('Incorrect URL path')
        // console.error(err)
        this.error = true
        this.errMsg = err.response
      }
    }
    // try {
    //   const { data } = await axios.get(this.$route.query.url)
    //   this.previewContentObject = data
    //   this.error = false
    // } catch (err) {
    //   // console.error('Incorrect URL path')
    //   // console.error(err)
    //   this.error = true
    //   this.errMsg = err.response
    // }
  },
  head() {
    return {
      title: 'Wordpress Preview'
    }
  },
  data() {
    return {
      previewContentObject: '',
      error: false,
      errMsg: '',
      content: '',
      title: '',
      snackbar: true
    }
  }
}
</script>

<style scoped>
</style>