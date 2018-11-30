
<template>
  <v-footer dark height="auto">
    <v-flex class="mt-3 mb-2 text-xs-center footer">
      <div v-html="blob('footer')" class="dynamic-content" @click="handleClicks"></div>
    </v-flex>
  </v-footer>
</template>

<script>
import { blob } from '@/mixins/blob'
export default {
  mixins: [blob],
  data() {
    return {}
  }
}
</script>

<style scoped>
.footer {
  font-size: 14px;
}
</style>