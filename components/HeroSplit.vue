<template>

  
    <div>





       <v-layout row wrap class="rule" >
     
      <v-flex xs12 sm12 md6 >
        <v-img :aspect-ratio="1/1" :max-height="500" alt="Illinois Criminal Justice Coordinating Councils" style="background: #25274D">
 
 <v-container fill-height class=" pb-5 pt-5">
       
        <v-layout align-center justify-center >
            <v-flex xs12>
            
                <div class="text-xs-center hero-section-text">
                     <span class=" brand-state hero">Illinois</span>
            <span class="brand-name hero ">&nbsp;Criminal Justice Coordinating Councils</span>
            <hr class="mt-4 mb-5">
            <h3 class="mt-3 hero-sub mb-5">Sponsored by the Illinois Criminal Justice Information Authority</h3>
            
                </div>
            </v-flex>
        </v-layout>
    </v-container>
      </v-img>
      </v-flex>

       <v-flex hidden-sm-and-down md6 >
        <v-img :aspect-ratio="1/1" :max-height="500" 
        :src="require('@/assets/img/hero.jpg')" 
        :lazy-src="require('@/assets/img/hero-lazy.png')" 
        alt="Illinois Criminal Justice Coordinating Councils">
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
      
       </v-layout>
</div>
</template>

<style scoped>
.hero-section {
  background: #bbb;
  background-size: cover;
  height: 550px;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  padding-right: 30px;
  /* margin-top: 71px; */
}
img:before {
  content: attr(alt);
}
.hero-section-text {
  color: #fff;
}
.brand-name.hero,
.brand-state.hero {
  font-family: 'Raleway', sans-serif;
  font-size: 40px;
  text-transform: uppercase;
  font-weight: 900;
  color: #fff;
}
.brand-state.hero {
  color: #fff;
}

h4 {
  color: #222;
  font-weight: 400;
}
.hero-sub {
  /* background: #fff;
        padding: 3px 5px 3px 5px; */
  font-weight: 800;
  color: #999;
  font-size: 16px;
}
.logo {
  margin-top: 25px;
}

.desaturate {
  -webkit-filter: grayscale(100%) !important; /* Safari 6.0 - 9.0 */
  filter: grayscale(100%) !important;
}

hr {
  border-top: 0px solid #fff !important;
}

.rule {
  border-bottom: 1px solid #ccc !important;
}
</style>