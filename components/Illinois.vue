<template>
    <div>
        
      <no-ssr>
            <fusioncharts
            type="illinois"
            width="700"
            height="450"
            dataFormat="json"
            :dataSource="dataSource"
            @entityClick="entityClick"
            @entityRollOver="entityRollOver"
            @entityRollOut="entityRollOut"
            ></fusioncharts>
           
      </no-ssr>
      
    
    </div>
</template>

<script>
const mapData = require('~/assets/data/map.json')
import { mapActions } from 'vuex'
import find from 'lodash.find'
export default {
  mounted() {
    //console.log(this.dataSource)
  },
  methods: {
    ...mapActions([
      'SET_COUNTY' // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    // uses the data info of the event 'dataplotrollover' and represents it
    entityClick: function(e) {
      //this.countyData = e.data
      this.label = e.data.label
      this.id = e.data.id
      let countyData = this.getCountyData('id', e.data.id)

      if (countyData.displayValue != '') {
        this.countyData = countyData
        this.SET_COUNTY(this.countyData)
      }
    },
    entityRollOver: function(e) {
      this.hoverStatus = e.data.label
    },
    entityRollOut: function(e) {
      this.hoverStatus = 'Select a County'
    },
    getCountyData: function(key, value) {
      var myObj
      if (key === 'id') {
        myObj = find(this.dataSource.data, {
          id: value
        })
      }
      return myObj
    }
  },
  data() {
    return {
      dataSource: mapData,
      label: '',
      hoverStatus: 'Select a County',
      id: '',
      countyData: {}
    }
  }
}
</script>

<style scoped>
</style>