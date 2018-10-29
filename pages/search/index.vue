

<template>
    <div class="page-height">
       <breadcrumb 
       :key="$store.state.forceRender" 
       title="CJCC Search" 
      
       showBreadcrumb></breadcrumb>
       

        <no-ssr>

            <ais-index :app-id="appId" :api-key="apiKey" index-name="cjcc">
                <v-container grid-list-xl text-xs-center>
                    <v-layout row wrap>
                        <v-flex xs8 offset-xs2>

                            <h3 class="mb-3">CJCC Search</h3>

                            <ais-search-box :autofocus="true" placeholder="Enter search term"></ais-search-box>

                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container grid-list-xl>
                    <v-layout row wrap>
                        <v-flex xs8 offset-xs2>
                            <my-results>
                                <template slot-scope="{ result }">

                                    <div class="results">

                                        <div class="results-title">
                                            <router-link :to="result.url">{{ result.title }}</router-link>
                                        </div>

                                        <div class="results-url">
                                            <router-link :to="result.url"> {{result.fullUrl}}</router-link>
                                        </div>

                                        <div class="results-blurb">
                                            <div v-html="result._snippetResult.body.value"></div>
                                        </div>
                                        



                                    </div>
                                </template>
                            </my-results>

                        </v-flex>
                    </v-layout>
                </v-container>

            </ais-index>
        </no-ssr>

    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import MyResults from '~/components/MyResults'
import config from '@/config'
export default {
  head() {
    return {
      title: 'Search',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: 'CJCC Search'
        }
      ]
    }
  },
  components: {
    MyResults,
    Breadcrumb
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    appId: function() {
      return config.ALGOLIA_APP_ID
    },
    apiKey: function() {
      return config.ALGOLIA_SEARCH_ONLY_KEY
    },
    searchIndexName: function() {
      return config.ALGOLIA_SEARCH_INDEX_NAME
    }
  }
}
</script>

<style>
.ais-input {
  border: 2px solid #ccc;
}
input[type='search'] {
  width: 60% !important;
}
.ais-index {
}
em {
  font-weight: 900;
  color: aaa;
  background: #ccc;
  padding: 2px;
}
.results-url {
  font-size: 14px;
  color: #666;
}
.results-title {
  font-weight: bold;
  margin-top: 30px;
}
.results-title a,
.results-url a {
  text-decoration: none;
}
.results-title a:hover,
.results-url a:hover {
  color: #888;
}
.results-blurb {
  margin-left: 10px;
  margin-top: 5px;
}
ul.ais-pagination {
  list-style-type: none !important;
}
li.ais-pagination__item {
  display: inline !important;
}
li.ais-pagination__item a {
  text-decoration: none !important;
  padding: 5px;
  margin-right: 3px;
  /* background: #f5f5f5;
        border: 1px solid #ccc; */
}
</style>