<template>
    <v-container fill-height fluid class="px-0" style="margin-top: -25px">
    <v-layout row wrap>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
         
         <h2 class="text-xs-center box-head">Find a Council</h2>
        
          <v-card-text class="px-3 font-weight-light box-text">
           Locate other criminal justice coordinating councils or similar groups across Illinois.
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
           <h2 class="text-xs-center box-head">What We Offer</h2>
          <v-card-text class="px-3 font-weight-light box-text ">
              Interested in crime trends and issues in your jurisdiction? Need assistance forming a criminal justice coordinating council? ICJIA can help.
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
           <h2 class="text-xs-center box-head">News & Events</h2>
          <v-card-text class="px-3 font-weight-light box-text ">
               Find out the latest news and information relevant to Criminal Justice Coordinating Councils  
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
      color: 'indigo darken-3'
    }
  }
}
</script>

<style scoped>
.box:hover {
  box-shadow: 0px 0px 150px #000000;
  z-index: 2;
  -webkit-transition: all 200ms ease-in;
  -webkit-transform: scale(1.1);
  -ms-transition: all 200ms ease-in;
  -ms-transform: scale(1.1);
  -moz-transition: all 200ms ease-in;
  -moz-transform: scale(1.1);
  transition: all 200ms ease-in;
  transform: scale(1.1);
  cursor: pointer;
}
.box-head {
  font-size: 28px;
}
.box-text {
  font-size: 18px;
  margin-top: -10px;
}
</style>