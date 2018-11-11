<template>
     <div class="page-height">

     <breadcrumb 
       :key="$store.state.forceRender" 
       title="News & Events"></breadcrumb>
     
    

    <v-container fill-height class="px-3"  id="page-content" >
    <v-layout row wrap>
      
     

      
      <v-flex xs12 class="pr-5 pl-5">
        
           <h1 class="text-xs-left box-head mt-5 mb-5 title-rule">News & Events</h1>
          
            
          <v-layout row wrap v-for="post in displayPosts" :key="post.id" class="mb-5">
          <v-flex xs12 sm12 md8>
            <router-link :to="post.route">
              <h3 class="title mb-2">{{ post.title}}</h3>
            </router-link>
          </v-flex>
          <v-flex xs12 sm12 md4 class="text-md-right">
             <h5 class="date">{{post.date | formatDate}}</h5>
          </v-flex>
          <v-flex xs12>
            
            <div class="exc excerpt"><router-link :to="post.route" class="excerpt-link">{{ post.excerpt }}</router-link>&nbsp;  <router-link :to="post.route">more</router-link>&raquo;</div>
          </v-flex>
          </v-layout>
      </v-flex>




  <v-flex xs12>
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

    pagerLength() {
      return Math.ceil(this.$store.getters.getAllNews.length / this.maxPosts)
    }
  },
  head() {
    return {
      title: 'News Archive',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: 'CJCC News Archive'
        }
      ]
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
  color: #444 !important;
}

h3 {
  line-height: 1.3 !important;
}
h5.date {
  color: #888;
}
</style>