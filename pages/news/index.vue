<template>
     <div>

     <breadcrumb 
       :key="$store.state.forceRender" 
       title="News Archive"></breadcrumb>
     
    

    <v-container fill-height class="px-3">
    <v-layout row wrap>
      
      <v-flex xs10 offset-xs1>
       
        <v-card light :color="color" height="100%" class=" pt-4 pb-4 pl-3 box elevation-0">
           <h1 class="text-xs-center box-head">News & Events Archive</h1>
          <v-card-text class="px-3 font-weight-light box-text mt-5">
            <div v-for="post in displayPosts" :key="post.id">
                <div>
            <router-link :to="post.route">
              <h3 class="headline mb-0">{{ post.title}}</h3>
            </router-link>
            <div>{{ post.type}}</div>
            <div>{{ post.excerpt}}</div>
          </div>
            </div>

          </v-card-text>
         
        </v-card>

<v-spacer></v-spacer>
        <div class="text-xs-center">
    <v-pagination
      v-model="page"
      :length="pagerLength"
      @input="getPage"
      circle
      :total-visible="7"
    ></v-pagination>
  </div>
      </v-flex>
    </v-layout>
    </v-container>



 

    

      
   </div>
</template>

<script>
import config from '@/config.js'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  created() {
    this.numberOfPosts = this.posts.length
  },
  data() {
    return {
      title: 'News',
      page: 1,
      color: 'grey lighten-5',
      maxPosts: config.maxPaginationItems,
      numberOfPosts: null
    }
  },
  components: {
    Breadcrumb
  },
  computed: {
    posts: {
      get() {
        return this.$store.getters.getAllNews
      }
    },
    start() {
      return this.page * this.maxPosts - this.maxPosts
    },
    end() {
      return this.start + this.maxPosts
    },
    displayPosts() {
      return this.posts.slice(this.start, this.end)
    },
    buttonsToDisplay() {
      return
    },
    pagerLength() {
      return Math.ceil(this.$store.getters.getAllNews.length / this.maxPosts)
    }
  },

  methods: {
    getPage() {
      console.log(
        'Posts: ',
        this.numberOfPosts,
        'Page:',
        this.page,
        'Start: ',
        this.start,
        'End: ',
        this.end
      )
    }
  }
}
</script>

<style>
.theme--light.v-pagination .v-pagination__item {
  outline: none !important;
}
</style>