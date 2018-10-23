<template>
    <div>
        <no-ssr>
<div id="chart-container">
   
            <fusioncharts
            type="california"
            width="350"
            height="350"
            :dataSource="dataSource"
             @entityClick="entityClick"
             @entityRollOver="entityRollOver"
             @entityRollOut="entityRollOut"

            ></fusioncharts>
        </div>
         Hover: {{hoverStatus}}<br/>
            Label: {{label}}<br/>
            ID: {{id}}
        </no-ssr>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

const dataSource = require('~/assets/data/map.json')
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
      this.label = e.data.label
      this.id = e.data.id
      this.SET_COUNTY(e.data)
    },
    entityRollOver: function(e) {
      this.hoverStatus = e.data.label
    },
    entityRollOut: function(e) {
      this.hoverStatus = 'Select a County'
    }
  },
  data() {
    return {
      dataSource: dataSource,
      label: '',
      hoverStatus: 'Select a County',
      id: ''
    }
  }
}
</script>

<style scoped>
</style>