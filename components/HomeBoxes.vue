<template>
    <v-container fill-height fluid class="px-0" style="margin-top: -25px;">
    <v-layout row wrap>
       <v-flex xs12 sm12 md4>
          <router-link to="/councils">
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box" >
         
         <h2 class="text-xs-center box-head">Find a Council</h2>
         
          <v-card-text class="px-3 font-weight-light box-text">
           Locate other criminal justice coordinating councils or similar groups across Illinois.
          </v-card-text>
         
        </v-card>
         </router-link>
      </v-flex>
       <v-flex xs12 sm12 md4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
           <h2 class="text-xs-center box-head">What We Offer</h2>
          <v-card-text class="px-3 font-weight-light box-text ">
              Interested in crime trends and issues in your jurisdiction? Need assistance forming a criminal justice coordinating council? ICJIA can help.
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs12 sm12 md4>
          <router-link to="/archive">
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
           <h2 class="text-xs-center box-head">News & Events</h2>
          <v-card-text class="px-3 font-weight-light box-text ">
               Find out the latest news and information relevant to Criminal Justice Coordinating Councils  
          </v-card-text>
        
        </v-card>
         </router-link> 
      </v-flex>
       
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      color: '#BDBDBD'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none !important;
}
.box:hover {
  background: #0b216e !important;
}
.box:hover > * {
  color: #ccc;
  cursor: pointer;
}
.box-head {
  font-size: 28px;
  text-transform: uppercase;
  color: #333;
}
.box-text {
  font-size: 18px;
  margin-top: -10px;
  color: #444;
}
</style>