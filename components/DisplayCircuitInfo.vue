<template>

    <div>

        <v-card raised>


            <v-card-title class="primary-title-bg">
                <div class="title-flex">
                    <div>
                        <h6>{{factSheetCounty}}</h6>
                        <h3>{{factSheetTitle}}</h3>

                    </div>

                </div>

            </v-card-title>



            <div class="card-text">

                <v-select style="font-weight: 900; text-transform: uppercase;" v-model="selectedCountyMetaData" :items="items" item-text="title"
                    item-value="id" single-line class="">
                </v-select>


                <div v-html="factSheetBody" style="margin-top: 15px;"></div>

                <!-- <h3>Circuit News</h3>
                {{apiIndexCircuits[selectedCircuit]}} -->


            </div>

        </v-card>

    </div>
</template>

<script>
    import axios from 'axios'
    const config = require("../config.json");
    import _ from 'lodash'
    export default {
        mounted() {
            this.initializeCountySelect();
            let data = this.getCountyMetaData('id', this.mapMetaData.data[0].id)
            this.selectedCircuit = data.circuit;
            this.$store.dispatch('GET_SELECTED_COUNTY_METADATA', data);
            this.getFactSheet()
            // console.log('data:', data.circuit)


        },
        data() {
            return {
                items: [],
                selectedCountyData: {},
                factSheetBody: '',
                factSheetTitle: '',
                factSheetCounty: '',
                selectedCircuit: null

            }
        },
        watch: {
            selectedCountyMetaData: function () {
                this.getFactSheet()
                this.getCircuitNews();

            }
        },
        computed: {
            selectedCountyMetaData: {
                get: function () {
                    return this.$store.getters.getSelectedCountyMetaData;
                },
                set: function (id) {
                    let data = this.getCountyMetaData('id', id)
                    this.$store.dispatch('GET_SELECTED_COUNTY_METADATA', data);
                    //this.getFactSheet()

                }
            },
            mapMetaData: function () {
                return this.$store.getters.getMapMetaData;
            },
            apiIndexCircuits: function () {
                return this.$store.getters.getApiIndexCircuits;
            },

        },
        methods: {
            getFactSheet() {
                let circuit = ''
                let siteUrl = ''
                if (!this.selectedCountyMetaData.hasOwnProperty('circuit')) {
                    circuit = '99'
                } else {
                    circuit = this.selectedCountyMetaData.circuit
                }
                this.selectedCircuit = circuit;
                //console.log('Circuit: ', circuit)
                siteUrl = `${config.councilApiPath}circuit-${circuit}.json`
                axios.get(siteUrl)
                    .then(response => {
                        this.factSheetCounty = this.selectedCountyMetaData.title || `Error`
                        this.factSheetBody = response.data.body || `Not Found`
                        this.factSheetTitle = response.data.title || 'Error'

                    })
                    .catch(e => {
                        console.log('Axios error: ', e)
                    })



            },
            getCircuitNews() {
                console.log('Get circuit news ')
            },
            getCountyMetaData: function (key, value) {
                var myObj
                if (key === 'title') {
                    myObj = _.find(this.mapMetaData.data, {
                        'title': value
                    });
                }
                if (key === 'id') {
                    myObj = _.find(this.mapMetaData.data, {
                        'id': value
                    });
                }
                return myObj
            },
            initializeCountySelect() {
                // Grab all unique titles
                let data = _.uniqBy(this.mapMetaData.data, function (elem) {
                    return JSON.stringify(_.pick(elem, ['title']));
                });
                // Remove unncessary keys
                data = _.map(data, o => _.omit(o, ['toolText', 'value', 'displayValue']));
                // Alphabetize
                data = _.orderBy(data, ['title'], ['asc']);
                // Finally, remove any elements that don't contain 'title' keys
                data = _.filter(data, (o) => (typeof o.title !== 'undefined'))
                this.items = data;
                return
            },
        }
    }
</script>

<style scoped>
    .card-text {
        padding: 30px 35px;
    }
</style>