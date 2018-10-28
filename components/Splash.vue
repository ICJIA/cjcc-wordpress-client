<template>
    <div>
       <v-img :aspect-ratio="16/9" :max-height="400" :src="fullSrc" :lazy-src="lazySrc" >
        
            <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
      </v-img>
     
       
    </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    contentID: {
      type: Number,
      default: 0
    }
  },
  computed: {
    meta() {
      return this.$store.state.siteMeta.filter(m => {
        return m.id === this.contentID
      })
    },
    fullSrc() {
      return this.meta[0].featuredImageFull
    },
    lazySrc() {
      return this.meta[0].featuredImageThumb
    }
  }
}
</script>

<style scoped>
</style>