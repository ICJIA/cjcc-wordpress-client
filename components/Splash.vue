<template>
    <div>
      <div v-if="fullSrc">
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
      


     
       Title: {{title }}
       <br/>
       
       Published: {{datePublished | formatDate}}
        <br/>
       Categories: {{categories}}
        <br/>
       Display Caption: {{displayCaption}}
        <br/>
       Words:  {{contentWords}}
        <br/>
       Reading Time: {{readingTime}}
       <br>
       Featured image full: {{fullSrc}}
       <br>
       Featured image thumb: {{lazySrc}}
       <br>
       Title position: {{titlePosition}}
        <br>
       Featured image width: {{featuredImageWidth}}


    </div>
</template>

<script>
function readingTime(text) {
  const wordsPerMinute = 200
  const noOfWords = text.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} minute read`
}
export default {
  data() {
    return {
      contentObject: this.$store.state.contentObject
    }
  },
  props: {
    contentID: {
      type: Number,
      default: 0
    }
  },
  computed: {
    title() {
      return this.contentObject.title.rendered
    },

    contentWords() {
      return this.contentObject.content.rendered.split(/\s/g).length
    },
    fullSrc() {
      if (this.contentObject.hasOwnProperty('featured_image_src')) {
        return this.contentObject.featured_image_src.full[0]
      } else {
        return false
      }
    },
    lazySrc() {
      if (this.contentObject.hasOwnProperty('featured_image_src')) {
        return this.contentObject.featured_image_src.thumb[0]
      } else {
        return false
      }
    },
    featuredImageWidth() {
      if (!this.fullSrc) {
        return false
      } else {
        return this.contentObject.acf.featured_image_width
      }
    },
    readingTime() {
      const wordsPerMinute = 200
      const noOfWords = this.contentWords
      const minutes = noOfWords / wordsPerMinute
      const readTime = Math.ceil(minutes)
      return `${readTime} minute read`
    },

    datePublished() {
      return this.contentObject.date
    },
    dateModified() {
      return this.contentObject.modified
    },

    categories() {
      if (this.contentObject.hasOwnProperty('category_names')) {
        return this.contentObject.category_names
          .map(c => {
            return c.slug
          })
          .filter(x => {
            return x != 'uncategorized'
          })
      } else {
        return false
      }
    },
    displayCaption() {
      if (this.contentObject.acf.hasOwnProperty('display_caption')) {
        return this.contentObject.acf.display_caption
      } else {
        return false
      }
    },
    titlePosition() {
      if (this.contentObject.acf.hasOwnProperty('title_position')) {
        return this.fullSrc ? this.contentObject.acf.title_position : 'default'
      } else {
        return 'default'
      }
    }
  }
}
</script>

<style scoped>
</style>