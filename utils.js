let getContentId = function(siteMeta, path) {
  let arr = siteMeta.filter(obj => {
    return obj.route === path
  })
  return arr[0].id
}

export { getContentId }
