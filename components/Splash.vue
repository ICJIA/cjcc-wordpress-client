<template>
    <div>
     <div v-if="splash==='full'">
       <v-img :aspect-ratio="16/9" :max-height="450" :src="fullSrc" :lazy-src="lazySrc" >
        
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
      <v-container fluid fill-height class="pl-2 mt-0" style="margin-top: -20px !important;">
           <v-layout row wrap>
             <v-flex xs12>
               <div v-if="displayCaption">
                  <div class="imgCaption">Insert caption here</div>
               </div>
             </v-flex>
           </v-layout>
      </v-container>
      <v-container fluid fill-height class="px-3 mt-2 text-xs-center">
           <v-layout row wrap>
             <v-flex xs10 offset-xs1>
               <div class="date">{{published | formatDate}}</div>
             </v-flex>
             <v-flex xs10 offset-xs1>
               <h1 class="mb-5">{{title}}</h1>
             </v-flex>
           </v-layout>
      </v-container>
     
      </div>

      <div v-if="splash==='centered'">
         <v-container fluid fill-height class="px-3 mt-5 text-xs-center">
           <v-layout row wrap>
             <v-flex xs10 offset-xs1>
               <div class="date">{{published | formatDate}}</div>
             </v-flex>
             <v-flex xs10 offset-xs1>
               <h1 class="mb-5">{{title}}</h1>
             </v-flex>
             <!-- <v-flex xs10 offset-xs1>
              <div class="time mb-5">{{readingTime}}</div>
             </v-flex> -->
 <v-flex xs10 offset-xs1>
       <v-img :aspect-ratio="16/9" :max-height="450" :src="fullSrc" :lazy-src="lazySrc" >

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
                  <div class="imgCaption">Insert caption here</div>
               </div>
        
      </v-flex>

     
      
    </v-layout>

     
    
         </v-container>
      </div>


      <div v-if="splash==='text'">
         <v-container fluid fill-height class="px-3 mt-5 text-xs-center">
           <v-layout row wrap>
             <v-flex xs10 offset-xs1>
               <div class="date">{{published | formatDate}}</div>
             </v-flex>
             <v-flex xs10 offset-xs1>
               <h1 class="mb-3">{{title}}</h1>
             </v-flex>
             
      
    </v-layout>
    
         </v-container>
      </div>
     
      


     
       <!-- Title: {{title }}
       <br/>
       
       Published: {{published | formatDate}}
        <br/>
       Categories: {{categories}}
        <br/>
       
       
       Words:  {{contentWords}}
        <br/>
       Reading Time: {{readingTime}}
       <br>
       Featured image full: {{fullSrc}}
       <br>
       Featured image lazy: {{lazySrc}}
       <br> -->

      
        


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

    caption() {
      return 'This is the image caption'
    },

    displayCaption() {
      const {
        acf: { display_caption = false }
      } = this.contentObject
      return display_caption
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