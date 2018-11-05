<template>

  
    <div>

<!-- <v-img :aspect-ratio="16/9" :max-height="500" :src="require('@/assets/img/iStock-947725966.jpg')" alt="Illinois Criminal Justice Coordinating Councils"> -->
 
 <v-img :aspect-ratio="16/9" :max-height="350" alt="Illinois Criminal Justice Coordinating Councils" style="background: #e1e1e1">
 
 <v-container fill-height class=" pb-5 pt-5">
        <!--- vertical and horizontal alignment -->
        <v-layout align-center justify-center >
            <v-flex xs12>
            
                <div class="text-xs-center hero-section-text">
                     <span class=" brand-state hero">Illinois</span>
            <span class="brand-name hero ">&nbsp;Criminal Justice Coordinating Councils</span>
            <h3 class="mt-3 hero-sub">Sponsored by the Illinois Criminal Justice Information Authority</h3>
            
                </div>
            </v-flex>
        </v-layout>
    </v-container>
      </v-img>
</div>
</template>

<style>
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
  font-size: 36px;
  text-transform: uppercase;
  font-weight: 900;
  color: #1a237e;
}
.brand-state.hero {
  color: #222;
}
.highlight {
}
h4 {
  color: #222;
  font-weight: 400;
}
.hero-sub {
  /* background: #fff;
        padding: 3px 5px 3px 5px; */
  font-weight: 800;
  color: #444;
}
.logo {
  margin-top: 25px;
}

.desaturate {
  -webkit-filter: grayscale(100%) !important; /* Safari 6.0 - 9.0 */
  filter: grayscale(100%) !important;
}
</style>