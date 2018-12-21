let siteName = 'cjcc'

require('dotenv').config()
let jsonfile = require('jsonfile')
let wtj = require('website-to-json')
let trim = require('trim')
let fs = require('fs')
let algoliaIndex = []
let parser = require('xml2json')
let algoliasearch = require('algoliasearch')
let crypto = require('crypto')
let previouslyIndexed

const site = {
  index: 'cjcc',
  sitemap: 'https://ilcjcc.org/sitemap.xml',
  urlBase: 'https://ilcjcc.org',
  bodyContentId: '#page-content',
  titleReplacement: 'ILLINOIS cjcc | '
}

appIndex = site.index
sitemap = site.sitemap
urlBase = site.urlBase
titleReplacement = site.titleReplacement
bodyContentId = site.bodyContentId

let client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)

let index = client.initIndex(`${appIndex}`)
index.clearIndex(function(err, content) {
  if (err) throw err
  console.log('Index cleared.')
  console.log(content)
})

// Get Sitemap from URL
let request = require('sync-request')
let res = request('GET', sitemap)
let xml = res.getBody().toString('utf8')
let myJson = parser.toJson(xml)
let urls = JSON.parse(myJson)['urlset'].url
let arrayOfUrls = urls.map(url => {
  return url.loc
})

let num = arrayOfUrls.length

function get(url) {
  // create Algolia objectID based on hash of page url
  let objectID = crypto
    .createHash('md5')
    .update(url)
    .digest('hex')
  console.log('Url: ', url)
  return wtj.extractUrl(url, {
    // create the page object for Algolia
    fields: ['data'],
    parse: function($) {
      return {
        keywords: $("meta[name='keywords' i]").attr('content'),
        title: $('title')
          .text()
          .replace(titleReplacement, ''),
        body: $('#page-content')
          .text()
          .substring(0, 9300),
        description: $("meta[name='description' i]").attr('content'),
        url: url.replace(/.*\/\/[^\/]*/, ''),
        fullUrl: url,
        objectID: objectID
      }
    }
  })
}

arrayOfUrls.map(async function(url) {
  await get(url).then(function(res) {
    num--
    algoliaIndex.push(res.data)
    console.log('Index successful: ', res.data.fullUrl)
    if (num === 0) {
      // Finished generating
      console.log(`Finished querying URLs`)
      setSearchObjects(algoliaIndex)
    }
  })
})

function setSearchObjects(objects) {
  // Send pages to Algolia

  index.addObjects(objects, function(err, content) {
    if (err) throw err
    console.log('Indexing complete.')
  })
}
