<template>
  <v-container fill-height fluid class="px-0" style="margin-top: -30px;">
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <router-link to="/council">
          <v-card dark :color="color1" height="100%" class="elevation-0 pt-5 pb-5 pl-3 box rule">
            <h2 class="text-xs-center box-head">Find a Council</h2>

            <v-card-text class="px-3 font-weight-light box-text">
              <div v-html="blob('home-box1-text')" class="dynamic-content" @click="handleClicks"></div>
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <router-link to="/what-we-offer">
          <v-card dark :color="color2" height="100%" class="elevation-0 pt-5 pb-5 pl-3 box rule">
            <h2 class="text-xs-center box-head">What We Offer</h2>
            <v-card-text class="px-3 font-weight-light box-text">
              <div v-html="blob('home-box2-text')" class="dynamic-content" @click="handleClicks"></div>
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <router-link to="/news">
          <v-card dark :color="color3" height="100%" class="elevation-0 pt-5 pb-5 pl-3 box rule">
            <h2 class="text-xs-center box-head">News & Events</h2>
            <v-card-text class="px-3 font-weight-light box-text">
              <div v-html="blob('home-box3-text')" class="dynamic-content" @click="handleClicks"></div>
            </v-card-text>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { blob } from '@/mixins/blob'
export default {
  mixins: [blob],
  data() {
    return {
      color1: '#E0E0E0',
      color2: '#E0E0E0',
      color3: '#E0E0E0'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none !important;
}
.box:hover {
  background: #25274d !important;
}
.box:hover > * {
  color: #fff;
  cursor: pointer;
}
.box-head {
  font-size: 28px;
  text-transform: uppercase;
  color: #000;
}
.box-text {
  font-size: 18px;
  margin-top: 0px;
  color: #000;
}

.rule {
  border-bottom: 1px solid #ccc !important;
  border-top: 1px solid #ccc !important;
}
</style>