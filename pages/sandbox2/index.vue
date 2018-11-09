<template>
    <div>
       <div v-for="county in counties" class="mb-5">
           {{county}}
       </div>
      
    </div>
</template>

<script>
import { usiljsconfig } from '@/assets/data/usiljsconfig'
export default {
  data() {
    return {
      myArray: []
    }
  },
  computed: {
    counties() {
      for (let key in usiljsconfig) {
        // TODO: check if proper key exists before pushing
        this.myArray.push(usiljsconfig[key])
      }
      return this.myArray
    }
  }
}
</script>

<style scoped>
</style>