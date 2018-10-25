<template>
    <v-container fill-height fluid class="px-0" style="margin-top: -25px">
    <v-layout row wrap>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
         
         <p v-blob:homebox-1></p>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
          
          <p v-blob:homebox-2></p>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-4 pb-4 pl-3 box">
     
               <p v-blob:homebox-3></p>
          </v-card-text>
        </v-card>
      </v-flex>
       
    </v-layout>
  </v-container>
</template>

<script>
import InjectBlob from '@/components/InjectBlob'
export default {
  data() {
    return {
      color: 'indigo darken-3'
    }
  },
  components: {
    InjectBlob
  }
}
</script>

<style >
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
  font-size: 38px;
}
.box-text {
  font-size: 18px;
  margin-top: 10px;
}
</style>