function getContentId(siteMeta, path) {
  let arr = siteMeta.filter(obj => {
    return obj.route === path
  })

  if (arr.length > 0) {
    return arr[0].id
  } else {
    return undefined
  }
}

const buildRequest = function(siteMeta, path) {
  const request = {}

  request['id'] = getContentId(siteMeta, path)
  request['route'] = path
  return request
}

export { buildRequest }
