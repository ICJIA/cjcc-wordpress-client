<template>
  <v-container fill-height fluid style="margin-top: -60px;">
    <v-layout row wrap v-resize="onResize">
      <v-flex xs12 sm12 md6 class="pr-5 pl-5" :class="{divider: displayDivider}">
        <router-link to="/news">
          <h1
            class="text-xs-center box-head mt-5 mb-5"
            style="border-bottom: 1px solid #ddd; padding-bottom: 10px;"
          >News & Events</h1>
        </router-link>

        <v-layout row wrap v-for="post in posts" :key="post.id" class="mb-5">
          <v-flex xs12 sm12 md8>
            <router-link :to="post.route">
              <h3 class="title mb-2">{{ post.title}}</h3>
            </router-link>
          </v-flex>
          <v-flex xs12 sm12 md4 class="text-md-right">
            <h5 class="date">{{post.date | formatDate}}</h5>
          </v-flex>
          <v-flex xs12>
            <div class="exc excerpt">
              <router-link
                :to="post.route"
                class="excerpt-link"
              >{{ post.excerpt | stripShortcodes }}</router-link>&nbsp;
              <router-link :to="post.route">more</router-link>&raquo;
            </div>
          </v-flex>
        </v-layout>

        <v-flex xs12 text-xs-center>
          <v-btn small to="/news">News & Events Archive
            <v-icon right dark>chevron_right</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex xs12 sm12 md6 class="pr-5 pl-5" :class="{topDivider: displayTopDivider}">
        <router-link to="/what-we-offer">
          <h1
            class="text-xs-center box-head mt-5 mb-5"
            style="border-bottom: 1px solid #ddd; padding-bottom: 10px;"
          >About the CJCC</h1>
        </router-link>
        <div v-html="blob('home-about')" class="dynamic-content" @click="handleClicks"></div>

        <v-flex xs12 text-xs-center mt-4>
          <v-btn small to="/what-we-offer">Read more
            <v-icon right dark>chevron_right</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { blob } from '@/mixins/blob'
export default {
  mounted() {
    this.onResize()
  },
  filters: {
    stripShortcodes: function(value) {
      let string = value.replace(/(\[.+\])/g, '')
      return string.trim()
    }
  },
  mixins: [blob],
  data() {
    return {
      color: 'grey lighten-5',
      displayDivider: true,
      displayTopDivider: false
    }
  },
  computed: {
    posts: {
      get() {
        return this.$store.getters.getFrontPageNews
      }
    }
  },
  methods: {
    onResize() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        this.displayDivider = false
        this.displayTopDivider = true
      } else {
        this.displayDivider = true
        this.displayTopDivider = false
      }
    }
  },
  watch: {}
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

.divider {
  border-right: 0px solid #aaa;
}
.box-text {
  padding-top: 25px;
  padding-bottom: 35px;
}

.topDivider {
  border-top: 1px solid #ccc;
}
</style>