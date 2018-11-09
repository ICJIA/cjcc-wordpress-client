<template>
    <section>
        <div id="outdated"></div>
    </section>
</template>

<script>
export default {
  mounted() {
    //event listener: DOM ready
    function addLoadEvent(func) {
      var oldonload = window.onload
      if (typeof window.onload != 'function') {
        window.onload = func
      } else {
        window.onload = function() {
          if (oldonload) {
            oldonload()
          }
          func()
        }
      }
    }
    //call plugin function after DOM ready
    addLoadEvent(function() {
      outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'borderImage',
        languagePath: '/outdatedbrowser/lang/en.html'
      })
    })
  }
}
</script>

<style scoped>
@import url('../node_modules/outdatedbrowser/outdatedbrowser/outdatedbrowser.css');
/* Target IE11: https://github.com/burocratik/outdated-browser/issues/198 */
</style>