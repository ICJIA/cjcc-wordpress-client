<template>
    <div>
         <no-ssr>
    <div id="chart-container">
            <fusioncharts
            type="illinois"
            width="550"
            height="350"
            dataFormat="json"
            :dataSource="dataSource"
            ></fusioncharts>
        </div>
    </no-ssr>
    </div>
</template>

<script>
const mapData = require('~/assets/data/map.json')
export default {
  data() {
    return {
      dataSource: mapData
    }
  }
}
</script>

<style scoped>
</style>