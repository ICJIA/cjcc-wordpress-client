<template>
    <v-container fill-height fluid class="px-3" style="margin-top: -30px;">
    <v-layout row wrap>
       <!-- <v-flex xs12 sm12 md6 hidden-sm-and-down>
        <v-img :aspect-ratio="1/1" :height="580" src="/placeholder.png">
       
      </v-img>
      </v-flex> -->

     

      <v-flex xs12 sm12 md6 class="divider">
        <v-card light :color="color" height="100%" class=" pt-4 pb-4 pl-3 box elevation-0">
           <h1 class="text-xs-center box-head">News & Events</h1>
          <v-card-text class="px-3 font-weight-light box-text ">
            <div v-for="post in posts" :key="post.id" class="mb-5">
                
            <router-link :to="post.route">
              <h3 class="title mb-2">{{ post.title}}</h3>
            </router-link>
            <div class="text-xs-right">
            <h5>{{post.date | formatDate}}</h5>
            </div>
            <div class="exc excerpt">{{ post.excerpt }}&nbsp;  <router-link :to="post.route">read more</router-link>&raquo;</div>
          </div>
           

          </v-card-text>
         
        </v-card>
      </v-flex>


       <v-flex xs12 sm12 md6>
        <v-card light :color="color" height="100%" class=" pt-4 pb-4 pl-3 box elevation-0">
           <h1 class="text-xs-center box-head">About the CJCC</h1>
          <v-card-text class="px-3 font-weight-light box-text ">
            <div v-blob:home-about></div>

          </v-card-text>
        </v-card>
      </v-flex>
      
       
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      color: 'grey lighten-5'
    }
  },
  computed: {
    posts: {
      get() {
        return this.$store.getters.getFrontPageNews
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  font-weight: bold;
  color: #555;
}
h1 {
  text-transform: uppercase;
}
.divider {
  border-right: 1px solid #aaa;
}
.box-text {
  padding-top: 25px;
  padding-bottom: 35px;
}
</style>