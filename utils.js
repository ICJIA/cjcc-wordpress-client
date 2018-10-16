function sanitize(str) {
  //str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, '')
  return str.trim().replace(/<(?:.|\n)*?>/gm, '')
}

const getMetaTitle = function(data) {
  return data[0].title.rendered
}

const getMetaDescription = function(data) {
  let obj

  obj = {
    hid: 'description',
    name: 'description',
    content: sanitize(data[0].content.rendered)
  }
  return obj
}

export { getMetaDescription, getMetaTitle }
