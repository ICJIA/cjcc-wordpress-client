<template>
    <div>
     <div v-if="splash==='full'">
       <v-img :aspect-ratio="16/9" :max-height="450" :src="fullSrc" :lazy-src="lazySrc" :alt="altText">
        
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
       <div v-if="displayCaption">
      <v-container fluid fill-height class="pl-2 mt-0" style="margin-top: -20px !important;">
           <v-layout row wrap>
             <v-flex xs12>
              
                  <div class="imgCaption">{{caption}}</div>
               
             </v-flex>
           </v-layout>
      </v-container>
      </div>
      <v-container fill-height class="px-3 mt-2">
           <v-layout row wrap>
             
             <v-flex xs10 offset-xs1 :class="titleDateAlignment" v-if="displayDate">
               <div class="date">{{published | formatDate}}</div>
             </v-flex>
             <v-flex xs10 offset-xs1 :class="titleDateAlignment">
               <h1 class="mb-0">{{title}}</h1>
             </v-flex>
           </v-layout>
      </v-container>
     
      </div>

      <div v-if="splash==='centered'">
         <v-container fluid fill-height class="px-3 mt-5">
           <v-layout row wrap>
             <v-flex xs10 offset-xs1 :class="titleDateAlignment" v-if="displayDate">
               <div class="date">{{published | formatDate}}</div>
             </v-flex>
             <v-flex xs10 offset-xs1 :class="titleDateAlignment">
               <h1 class="mb-3">{{title}}</h1>
             </v-flex>
            
 <v-flex xs10 offset-xs1>
       <v-img :aspect-ratio="16/9" :max-height="450" :src="fullSrc" :lazy-src="lazySrc" alt="Illinois Criminal Justice Coordinating Councils splash photo">

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
      </v-flex>
      <v-flex xs10 offset-xs1 class="text-xs-left">
         <div v-if="displayCaption">
                  <div class="imgCaption">{{caption}}</div>
               </div>
        
      </v-flex>

     
      
    </v-layout>

     
    
         </v-container>
      </div>


      <div v-if="splash==='text'">
         <v-container fill-height class="px-3 mt-5 text-xs-center">
           <v-layout row wrap>
             <v-flex xs10 offset-xs1 :class="titleDateAlignment" v-if="displayDate">
               <div class="date">{{published | formatDate}}</div>
             </v-flex>
             <v-flex xs10 offset-xs1 :class="titleDateAlignment">
               <h1 class="mb-1">{{title}}</h1>
             </v-flex>
             
      
    </v-layout>
    
         </v-container>
      </div>
     
      

    </div>
</template>

<script>
export default {
  data() {
    return {
      contentObject: this.$store.state.contentObject
    }
  },
  props: {},
  computed: {
    title() {
      const {
        title: { rendered = '' }
      } = this.contentObject
      return rendered
    },

    contentWords() {
      const {
        content: { rendered = '' }
      } = this.contentObject
      return rendered.split(/\s/g).length
    },
    fullSrc() {
      const {
        featured_image_src: { full = [] }
      } = this.contentObject
      return full[0]
    },
    lazySrc() {
      const {
        featured_image_src: { thumb = [] }
      } = this.contentObject
      return thumb[0]
    },
    splash() {
      const {
        acf: { splash_type = 'text' }
      } = this.contentObject
      return splash_type
    },
    readingTime() {
      const wordsPerMinute = 200
      const noOfWords = this.contentWords
      const minutes = noOfWords / wordsPerMinute
      const readTime = Math.ceil(minutes)
      return `${readTime} minute read`
    },

    published() {
      const { date } = this.contentObject
      return date
    },
    modified() {
      const { modified } = this.contentObject
      return modified
    },
    displayDate() {
      const {
        acf: { display_date = 'false' }
      } = this.contentObject
      return display_date
    },

    caption() {
      const {
        better_featured_image: { caption = '' }
      } = this.contentObject
      return caption
    },

    altText() {
      const {
        better_featured_image: { alt_text = '' }
      } = this.contentObject
      return alt_text
    },

    displayCaption() {
      const {
        acf: { display_caption = false }
      } = this.contentObject
      return display_caption
    },
    titleDateAlignment() {
      const {
        acf: { title_date_alignment = 'text-xs-left' }
      } = this.contentObject
      return title_date_alignment
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
    }
  }
}
</script>

<style scoped>
.date {
  color: #999;
  font-size: 16px;
  font-weight: bold;
}
.imgCaption {
  font-size: 14px;
  color: #777;
}
</style>