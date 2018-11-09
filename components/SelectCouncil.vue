<template>
    <div>
        
                <v-card raised>


            <div class="card-text">

                <v-select style="font-weight: 900;" v-model="selectedCountyMetaData" :items="items" item-text="title"
                    item-value="id" single-line class="" 
                    label="Select County" 
                    :hint="displayHint"
                    persistent-hint>
                </v-select>


                <div style="margin-top: 35px;" v-html="content">
                   
                </div>

               


            </div>

        </v-card>
    </div>
</template>

<script>
import uniqBy from 'lodash.uniqby'
import pick from 'lodash.pick'
import map from 'lodash.map'
import omit from 'lodash.omit'
import orderBy from 'lodash.orderby'
import filter from 'lodash.filter'
import find from 'lodash.find'
export default {
  mounted() {
    this.initializeCountySelect()
  },
  computed: {
    mapMetaData: function() {
      return this.$store.state.mapMetaData
    },
    selectedCountyMetaData: {
      get: function() {
        return this.$store.state.countyData
      },
      set: function(id) {
        let data = this.getCountyMetaData('id', id)
        //console.log(data)
        this.$store.dispatch('SET_COUNTY', data)
        //this.getFactSheet()
      }
    },
    displayHint() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return 'Select a county to display CJCC Fact Sheet'
      } else {
        return 'Click a shaded county to display CJCC Fact Sheet'
      }
    }
  },
  data() {
    return {
      items: [],
      selectedCountyData: {},
      factSheetBody: '',
      factSheetTitle: 'Fact Sheet Title',
      factSheetCounty: 'Fact Sheet County',
      selectedCircuit: null,
      councilInfo: {},
      content: ''
    }
  },
  watch: {
    selectedCountyMetaData: function() {
      this.getFactSheet()
      //this.getCircuitNews();
    }
  },

  methods: {
    initializeCountySelect() {
      // Grab all unique titles
      let data = uniqBy(this.mapMetaData.data, function(elem) {
        return JSON.stringify(pick(elem, ['title']))
      })
      // Remove unncessary keys
      data = map(data, o => omit(o, ['toolText', 'value', 'displayValue']))
      // Alphabetize
      data = orderBy(data, ['title'], ['asc'])
      // Finally, remove any elements that don't contain 'title' keys
      data = filter(data, o => typeof o.title !== 'undefined')
      this.items = data
      console.log(this.items)
      return
    },
    getFactSheet() {
      try {
        const content = require(`@/api/council/${
          this.selectedCountyMetaData.slug
        }/index.json`)
        this.content = content[0].content.rendered
      } catch (e) {
        this.content = `${e}`
      }
    },
    getCountyMetaData: function(key, value) {
      var myObj
      if (key === 'id') {
        myObj = find(this.mapMetaData.data, {
          id: value
        })
      }
      return myObj
    }
  }
}
</script>

<style scoped>
.card-text {
  padding: 10px 35px;
}
</style>