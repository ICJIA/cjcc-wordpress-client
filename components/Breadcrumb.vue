<template>
<div>
    <div class="crumb-container" v-if="!home">
    <span class="crumb" >
       
       <nuxt-link to="/">Home</nuxt-link>&nbsp;/&nbsp;{{type}}&nbsp;/&nbsp;{{title}}
       
       
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
    console.log($nuxt.$route.path)
    if ($nuxt.$route.path === '/') {
      //console.log('home')
      this.home = true
    } else {
      //console.log('not home')
      const contentMeta = this.siteMeta.filter(m => {
        return m.route === $nuxt.$route.path
      })
      this.title = startCase(toLower(contentMeta[0].title))
      this.type = startCase(toLower(contentMeta[0].type))
      this.home = false
      this.home = false
    }
    // if (this.$nuxt.route.path === '/') {
    //   this.home = false
    // } else {
    //   const contentMeta = this.siteMeta.filter(m => {
    //     return m.route === $nuxt.$route.path
    //   })
    //   //console.log(contentMeta[0].title)
    //   // Convert to title case via lodash
    //   this.title = startCase(toLower(contentMeta[0].title))
    //   this.type = startCase(toLower(contentMeta[0].type))
    //   this.home = false
    // }
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
}
</style>