<template>
    <v-container fill-height fluid class="px-0" style="margin-top: -25px">
    <v-layout row wrap>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-3 pb-3">
         
         <h2 class="text-xs-center">Test Title 1</h2>
        
          <v-card-text class="px-3">
            <no-ssr>
            <dummy text="50"></dummy>
            </no-ssr>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-3 pb-3">
           <h2 class="text-xs-center">Test Title 2</h2>
          <v-card-text class="px-3">
               <no-ssr>
            <dummy text="50"></dummy>
            </no-ssr>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs4>
        <v-card dark :color="color" height="100%" class=" pt-3 pb-3">
           <h2 class="text-xs-center">Test Title 3</h2>
          <v-card-text class="px-3">
               <no-ssr>
            <dummy text="50"></dummy>
            </no-ssr>
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
      color: 'indigo darken-1'
    }
  }
}
</script>

<style scoped>
</style>