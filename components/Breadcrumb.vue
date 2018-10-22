<template>
<div>
    <div class="crumb-container" v-if="displayBreadcrumb">
    <span class="crumb" >
       
       <nuxt-link to="/">Home</nuxt-link>&nbsp;/&nbsp;{{type}}&nbsp;/&nbsp;<span class="bc-title">{{title}}</span>
       
       
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
      this.displayBreadcrumb = contentMeta[0].breadcrumb
    }
  },
  data() {
    return {
      title: '',
      type: '',
      home: true,
      displayBreadcrumb: false
    }
  },
  computed: mapState(['siteMeta'])
}
</script>

<style scoped>
.crumb {
  float: right;
  margin-right: 10px;
  margin-top: 14px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 12px;
}

.crumb-container {
  height: 50px;
  background: #eee;
}
.bc-title {
  color: #555;
}
</style>