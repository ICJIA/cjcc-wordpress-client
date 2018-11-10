const fs = require('nano-fs')
const axios = require('axios')
const rimraf = require('rimraf')
var path = require('path')

const config = {
  sitemetaUrl: 'https://cjcc.icjia-api.cloud/wp-json/wp/v2/sitemeta/',
  localApiDirectory: './static/api'
}

const writeToFile = async (filePath, apiFullUrl) => {
  const { data } = await axios.get(`${apiFullUrl}`)
  await fs.mkpath(path.resolve(filePath)) // Make sure path exists

  console.log('Save to file: ', `${filePath}/index.json`)
  const myPath = path.resolve(`${filePath}/index.json`)
  return await fs.writeFile(
    path.resolve(`${filePath}/index.json`),
    JSON.stringify(data),
    {
      encoding: 'utf8'
    }
  )
}

/**
 * For sitemeta construction, see: https://github.com/ICJIA/cjcc-wordpress-client/blob/master/wordpress/icjia-functions.php
 */
const fetchSitemeta = async function() {
  const { data } = await axios.get(config.sitemetaUrl)
  await fs.mkpath(path.resolve(config.localApiDirectory))
  await fs.writeFile(
    path.resolve(`${config.localApiDirectory}/sitemeta.json`),
    JSON.stringify(data),
    {
      encoding: 'utf8'
    }
  )
  console.log('Save to file: ', `${config.localApiDirectory}/sitemeta.json`)

  return data
}

const resolvePromises = async function(res) {
  await Promise.all(res)
  return
}

rimraf.sync(path.resolve(config.localApiDirectory))

fetchSitemeta()
  .then(
    res =>
      (promises = res.map(r => {
        writeToFile(config.localApiDirectory + r.route, r.apiFullUrl)
      }))
  )
  .then(promises => resolvePromises(promises))
