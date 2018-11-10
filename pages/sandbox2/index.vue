<template>
    <div>
     
      
       <v-select style="font-weight: 900;" :items="items" item-text="title"
                    item-value="cid" single-line class="" 
                    v-model="selectedCountyMetaData"
                    label="Select County" 
                    hint="Select a county"
                    persistent-hint>
                </v-select>

<div v-html="content"></div>
      
    </div>
</template>

<script>
import { usiljsconfig } from '@/assets/data/usiljsconfig'
import startCase from 'lodash.startcase'
import camelCase from 'lodash.camelcase'
import find from 'lodash.find'

export default {
  data() {
    return {
      items: [],
      content: ''
    }
  },
  created() {
    // populate select box
    for (let key in usiljsconfig) {
      const { slug, cid } = usiljsconfig[key]
      if (slug !== undefined && cid !== undefined) {
        // create a new 'title' key, then put everything in title case
        usiljsconfig[key].title = startCase(
          camelCase(usiljsconfig[key].hover + ' County')
        )

        this.items.push(usiljsconfig[key])
      }
    }
  },
  methods: {
    getCountyMetaData: function(value) {
      var myObj

      myObj = find(this.items, {
        cid: value
      })

      return myObj
    },
    getFactSheet() {
      try {
        const content = require(`@/static/api/council/${
          this.selectedCountyMetaData.slug
        }/index.json`)
        this.content = content[0].content.rendered
      } catch (e) {
        this.content = `${e}`
      }
    }
  },
  computed: {
    selectedCountyMetaData: {
      get: function() {
        return this.$store.state.countyData
      },
      set: async function(cid) {
        let countyData = this.getCountyMetaData(cid)
        this.$store.dispatch('SET_COUNTY', countyData)
        this.getFactSheet()
      }
    }
  }
}
</script>

<style scoped>
</style>