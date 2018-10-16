<template>
    <div style="margin-top: 70px">
       
       {{data}}
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import config from '@/config'
import { getMetaTitle, getMetaDescription } from '@/utils.js'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  async asyncData({ params, redirect }) {
    const { data } = await axios.get(`${config.getPageBySlug}${params.slug}`)
    if (data.length === 0) {
      return redirect(config.redirect404)
    }
    return { data }
  },
  components: {
    Breadcrumb
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