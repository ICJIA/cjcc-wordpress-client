<template>
    <v-container fill-height fluid style="margin-top: -25px;">
    <v-layout row wrap v-resize="onResize">
       <!-- <v-flex xs12 sm12 md6 hidden-sm-and-down>
        <v-img :aspect-ratio="1/1" :height="580" src="/placeholder.png">
       
      </v-img>
      </v-flex> -->

     

      <v-flex xs12 sm12 md6 class="pr-5 pl-5" :class="{divider: displayDivider}">
        
           <h1 class="text-xs-center box-head mt-5 mb-5" style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">News & Events</h1>
          
            
          <v-layout row wrap v-for="post in posts" :key="post.id" class="mb-5">
          <v-flex xs12 sm12 md6>
            <router-link :to="post.route">
              <h3 class="title mb-2">{{ post.title}}</h3>
            </router-link>
          </v-flex>
          <v-flex xs12 sm12 md6 class="text-md-right">
             <h5>{{post.date | formatDate}}</h5>
          </v-flex>
          <v-flex xs12>
            
            <div class="exc excerpt"><router-link :to="post.route" class="excerpt-link">{{ post.excerpt }}</router-link>&nbsp;  <router-link :to="post.route">more</router-link>&raquo;</div>
          </v-flex>
          </v-layout>
          
           

        
         
       
      </v-flex>


       <v-flex xs12 sm12 md6 class="pr-5 pl-5" :class="{topDivider: displayTopDivider}">
       
           <h1 class="text-xs-center box-head mt-5 mb-5" style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">About the CJCC</h1>
         
            <div v-blob:home-about></div>

         
      </v-flex>
      
       
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.onResize()
  },
  data() {
    return {
      color: 'grey lighten-5',
      displayDivider: true,
      displayTopDivider: false
    }
  },
  computed: {
    posts: {
      get() {
        return this.$store.getters.getFrontPageNews
      }
    }
  },
  methods: {
    onResize() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        this.displayDivider = false
        this.displayTopDivider = true
      } else {
        this.displayDivider = true
        this.displayTopDivider = false
      }
    }
  },
  watch: {}
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-weight: bold;
  color: #0a1f61 !important;
}

a.excerpt-link {
  font-weight: normal !important;
  color: #444 !important;
  text-decoration: none;
}

a.excerpt-link:hover {
  color: #666 !important;
}

h1 {
  text-transform: uppercase;
  color: #0e2b85 !important;
}
.divider {
  border-right: 0px solid #aaa;
}
.box-text {
  padding-top: 25px;
  padding-bottom: 35px;
}

.topDivider {
  border-top: 1px solid #ccc;
}
</style>