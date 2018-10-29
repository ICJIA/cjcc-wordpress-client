<template>
    <div v-if="query.length > 0">
        <ais-stats style="font-size: 14px">
            <template slot-scope="{ totalResults, processingTime, query }">
                There are {{ totalResults }} results matching your query:
                <b>{{ query }}</b>
            </template>
        </ais-stats>
        <slot name="header"></slot>

        <slot name="default" v-for="(result, index) in results" :result="result" :index="index">
            {{index}}. Result 'objectID': {{ result.objectID }}
        </slot>
        <slot name="footer"></slot>

        <ais-powered-by class="mt-4 text-xs-right"></ais-powered-by>
        <ais-stats style="font-size: 14px">
            <template slot-scope="{ totalResults}">
                <div v-if="totalResults > 10">
                    <ais-pagination v-on:page-change="onPageChange"></ais-pagination>
                </div>
            </template>
        </ais-stats>


    </div>
</template>

<script>
import { Component } from 'vue-instantsearch'
export default {
  mixins: [Component],
  computed: {
    query() {
      return this.searchStore.query
    },
    results() {
      return this.searchStore.results
    }
  },
  methods: {
    onPageChange(page) {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
</style>