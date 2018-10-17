function sanitize(str) {
  //str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '')
  return str.trim().replace(/<(?:.|\n)*?>/gm, '')
}

const getMetaTitle = function(data) {
  return data.title.rendered
}

const getMetaDescription = function(data) {
  let obj

  obj = {
    hid: 'description',
    name: 'description',
    content: sanitize(data.content.rendered)
  }
  return obj
}

export { getMetaDescription, getMetaTitle }
