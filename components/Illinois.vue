<template>
    <div>
        
      <no-ssr>
        
          

           <div id="chart-container" >

            <div>
                <h3>Loading CJCC Map...</h3>
                <v-progress-circular size="64" indeterminate color="deep-purple darken-3" style="margin-top: 50px"></v-progress-circular>
            </div>

        </div>
           
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
    this.renderChart(this)
  },
  methods: {
    ...mapActions([
      'SET_COUNTY' // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    // uses the data info of the event 'dataplotrollover' and represents it

    getCountyData: function(key, value) {
      var myObj
      if (key === 'id') {
        myObj = find(this.dataSource.data, {
          id: value
        })
      }
      return myObj
    },
    getChartEvents: function() {
      const events = {
        entityClick: e => {
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
        }
      }
      return events
    },
    renderChart(vm) {
      FusionCharts.ready(function() {
        this.ariMap = new FusionCharts({
          type: 'illinois',
          renderAt: 'chart-container',
          width: '500',
          height: '700',
          dataSource: mapData,
          events: vm.getChartEvents()
        }).render()
      })
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