import Vue from 'vue'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import FusionMaps from 'fusioncharts/fusioncharts.maps'
import California from 'fusionmaps/maps/fusioncharts.california'

// Register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, FusionMaps, California)
