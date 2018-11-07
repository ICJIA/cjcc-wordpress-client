import { handleClicks } from '@/mixins/handleClicks'
export const blob = {
  data() {
    return {}
  },
  mounted() {},
  mixins: [handleClicks],
  methods: {
    blob(slug) {
      const blob = this.$store.state.blobCache.filter(b => {
        return b.title === slug
      })

      if (blob.length) {
        return blob[0].content
      } else {
        return '<h2>Undefined blob: ' + slug + '</h2>'
      }
    }
  }
}
