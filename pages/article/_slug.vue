<template>
    <div>
     <!-- <breadcrumb/> -->
       {{data}}
      
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { getMetaTitle, getMetaDescription } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  mounted() {},
  components: {
    Breadcrumb
  },

  async asyncData({ params, redirect }) {
    const { data } = await axios.get(`${config.getArticleBySlug}${params.slug}`)
    if (data.length === 0) {
      return redirect(config.redirect404)
    }
    return { data }
  },
  data() {
    return {}
  },
  methods: {},
  head() {
    return {
      title: getMetaTitle(this.data),
      meta: [getMetaDescription(this.data)]
    }
  },

  watchQuery: true
}
</script>

<style scoped>
</style>