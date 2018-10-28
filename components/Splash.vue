<template>
    <div>
      
        <v-img :aspect-ratio="16/9" :max-height="400" :src="splash">

      </v-img>
    </div>
</template>

<script>
export default {
  props: {
    splash: {
      type: String,
      default: ''
    },
    data() {
      return {}
    },
    computed: {
      splash() {
        return ''
      }
    },
    methods: {}
  }
}
</script>

<style scoped>
</style>