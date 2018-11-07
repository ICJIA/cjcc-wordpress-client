<template>
    <div v-html="content" class="dynamic-content"
          @click="handleClicks"></div>
</template>

<script>
import { handleClicks } from '@/mixins/handleClicks'
export default {
  data() {
    return {
      content: 'Undefined'
    }
  },
  mixins: [handleClicks],
  created() {
    const blobs = this.$store.state.blobCache
    const blobTitle = this.title

    const blob = blobs.filter(x => {
      return x.title === blobTitle
    })

    if (blob.length) {
      this.content = blob[0].content
    } else {
      this.content = '<h2>Undefined blob: ' + blobTitle + '</h2>'
    }
  },
  props: {
    title: {
      type: String,
      default: 'Undefined'
    }
  }
}
</script>

<style scoped>
</style>