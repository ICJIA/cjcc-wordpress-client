<template>
  <div class="breadcrumb text-xs-right">
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

export default {
  mounted() {
    if (this.$props.type != 'page') {
      this.displayType = true
    } else {
      this.displayType = false
    }
  },
  data() {
    return {
      displayType: true
    }
  },
  computed: mapState(['siteMeta']),
  props: {
    title: {
      type: String,
      default: 'ILLINOIS CJCC'
    },
    type: {
      type: String,
      default: 'Page'
    },
    typeUrl: {
      type: String,
      default: '/'
    },
    showBreadcrumb: {
      type: Boolean,
      default: true
    },
    methods: {}
  }
}
</script>

<style scoped>
.breadcrumb {
  background: #ccc;
  height: 50px;
  font-size: 12px;
  font-weight: bold;
}
.breadcrumb-content {
  padding-top: 12px;
  padding-right: 15px;
  text-transform: uppercase;
}
</style>