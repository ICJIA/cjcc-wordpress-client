import Vue from 'vue'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import FusionMaps from 'fusioncharts/fusioncharts.maps'
import Illinois from 'fusionmaps/maps/fusioncharts.illinois'

FusionCharts.options.creditLabel = false

// Register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, FusionMaps, Illinois)
