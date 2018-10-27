<template>
  <div class="breadcrumb text-xs-right" v-if="displayBreadcrumb">
    <div class="breadcrumb-content">
    <nuxt-link to="/">HOME</nuxt-link> / 
    <span v-if="displayType">
      <nuxt-link :to="typeUrl">{{type}}</nuxt-link> / </span>
    
    {{title}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const toLower = require('lodash.tolower')
const startCase = require('lodash.startcase')
import findIndex from 'lodash.findindex'

export default {
  mounted() {
    if (this.$props.type != 'page') {
      this.displayType = true
    } else {
      this.displayType = false
    }
    // console.log(
    //   'Index: ',
    //   findIndex(this.$store.state.siteMeta, {
    //     id: this.$props.contentID
    //   }),
    //   this.$store.state.siteMeta[2].breadcrumb
    // )
  },
  data() {
    return {
      displayType: true
    }
  },
  computed: {
    displayBreadcrumb() {
      const index = findIndex(this.$store.state.siteMeta, {
        id: this.$props.contentID
      })

      if (this.$props.hide) {
        return false
      }

      if (index === -1) {
        return true
      } else {
        return this.$store.state.siteMeta[index].breadcrumb
      }
      return this.$store.state.siteMeta[index].breadcrumb
    }
  },
  props: {
    title: {
      type: String,
      default: 'ILLINOIS CJCC'
    },
    type: {
      type: String,
      default: 'page'
    },
    typeUrl: {
      type: String,
      default: '/'
    },
    contentID: {
      type: Number,
      default: 0
    },
    hide: {
      type: Boolean,
      default: false
    },
    methods: {}
  }
}
</script>

<style scoped>
.breadcrumb {
  /* background: #1a237e; */
  background: #ccc;
  height: 50px;
  font-size: 12px;
  font-weight: bold;
}
.breadcrumb-content {
  padding-top: 15px;
  padding-right: 15px;
  text-transform: uppercase;
  color: #333;
}

a {
  /* color: #ccc; */
  text-decoration: none;
  color: #888;
}

a:hover {
  color: #fff;
}
</style>