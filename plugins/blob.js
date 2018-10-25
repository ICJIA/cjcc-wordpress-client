import Vue from 'vue'

Vue.directive('blob', {
  bind(el, binding, vnode) {
    // console.log(vnode.context.$route)
    //console.log(vnode.context.$store.state.blob)

    // console.log(
    //   binding.name,
    //   binding.value,
    //   binding.arg,
    //   binding.expression,
    //   binding.modifiers
    // )
    const blobs = vnode.context.$store.state.blobCache
    const blobTitle = binding.arg

    const blob = blobs.filter(x => {
      return x.title === blobTitle
    })

    if (blob.length) {
      el.innerHTML = blob[0].content
    } else {
      el.innerHTML =
        '<h2 class="text-xs-center">Blob not found: ' + blobTitle + '</h2>'
    }
  }
})
