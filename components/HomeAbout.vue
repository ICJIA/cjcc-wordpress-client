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
            <div v-for="post in posts" :key="post.id">
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
      </v-flex>


       <v-flex xs12 sm12 md6>
        <v-card light :color="color" height="100%" class=" pt-4 pb-4 pl-3 box elevation-0">
           <h1 class="text-xs-center box-head">About the CJCC</h1>
          <v-card-text class="px-3 font-weight-light box-text ">
            <p> Criminal Justice Coordinating Councils (CJCCs) are strategic planning bodies made up local criminal justice policymakers, practitioners, and community members that serve as a forum for collaborating on policy, programs, and operations. </p>
            
            <p>As part of the National Criminal Justice Reform Project (NCJRP), the Illinois Criminal Justice Information Authority (ICJIA) and Loyal University’s Center for Criminal Justice Research, Policy and Practice, are partnering to support the formation of Criminal Justice Coordinating Councils. We provide: </p>
<ul>
    <li>Research support</li>
<li>Technical assistance </li>
<li>Funding opportunities for planning and program implementation  </li>
</ul>

<p>
For more information on this initiative, see our 2018 State Plan to Support Criminal Justice Coordinating Councils.
</p>

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