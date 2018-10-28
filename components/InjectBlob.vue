<template>
    <div v-html="blob.content"></div>
</template>

<script>
export default {
  data() {
    return {
      blob: 'Blob not found'
    }
  },
  created() {
    const blobs = this.$store.state.blobCache
    const blobTitle = this.title

    const blob = blobs.filter(x => {
      return x.title === blobTitle
    })
    this.blob = blob[0]
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