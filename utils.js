const getContentId = function(siteMeta, path) {
  let arr = siteMeta.filter(obj => {
    return obj.route === path
  })

  if (arr.length > 0) {
    return arr[0].id
  } else {
    return undefined
  }
}

const getApiUrlBySlug = function(siteMeta, path) {
  let arr = siteMeta.filter(obj => {
    return obj.route === path
  })
  if (arr.length > 0) {
    return arr[0].apiUrlBySlug
  } else {
    return undefined
  }
}

export { getContentId, getApiUrlBySlug }
