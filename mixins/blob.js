import { handleClicks } from '@/mixins/handleClicks'
export const blob = {
  data() {
    return {}
  },
  mounted() {},
  mixins: [handleClicks],
  methods: {
    blob(blobSlug) {
      try {
        const blob = require(`@/static/api/blob/${blobSlug}/index.json`)
        return blob[0].content.rendered
      } catch (e) {}
      return '<h2>Blob undefined: ' + blobSlug + '</h2>'
    }
  }
}
