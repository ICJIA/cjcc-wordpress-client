<template>
    <div>
      <v-container style="margin-top: 30px">
       <div v-html="previewContentObject.content.rendered"></div>
       <div v-if="error"><center>
         Error:<br>{{errMsg}}
         </center>
         </div>
      </v-container>
        
    </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  async created() {
    console.log('created')
    try {
      const { data } = await axios.get(this.$route.query.url)
      this.previewContentObject = data
      this.error = false
    } catch (err) {
      // console.error('Incorrect URL path')
      // console.error(err)
      this.error = true
      this.errMsg = err.response
    }
  },
  data() {
    return {
      previewContentObject: null,
      error: false,
      errMsg: ''
    }
  }
}
</script>

<style scoped>
</style>