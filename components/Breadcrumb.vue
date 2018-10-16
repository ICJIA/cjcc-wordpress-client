<template>
<div>
    <div class="crumb-container">
    <span class="crumb" >
       
       <nuxt-link to="/">Home</nuxt-link>&nbsp;/&nbsp;{{title}}
       
       
    </span>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const toLower = require('lodash.tolower')
const startCase = require('lodash.startcase')

export default {
  mounted() {
    const contentMeta = this.siteMeta.filter(m => {
      return m.route === $nuxt.$route.path
    })
    console.log(contentMeta[0].title)
    // Convert to title case via lodash
    this.title = startCase(toLower(contentMeta[0].title))
  },
  data() {
    return {
      title: '',
      type: '',
      home: false
    }
  },
  computed: mapState(['siteMeta'])
}
</script>

<style scoped>
.crumb {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}

.crumb-container {
  height: 50px;
  background: #ccc;
}
</style>