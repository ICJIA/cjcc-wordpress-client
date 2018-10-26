const app = {
  clientURL: 'https://cjcc.netlify.com',
  apiUrl: 'https://cjcc.icjia-api.cloud/wp-json/',
  frontPagePosts: 3,
  launchWebpackMonitor: false,
  redirect404: '/404.html',
  getRoutes: 'wp/v2/routes/',
  getSiteMeta: 'wp/v2/sitemeta/',
  getBlobMeta: 'wp/v2/blobmeta/',
  contentCacheEnabled: true,
  contentCacheSize: 10,
  embed: '&_embed',
  defaultPageTitle: 'CJCC',
  staticRoutes: ['/', '/search', '/news', '/preview'],
  mapDataRoute: '~/assets/data/map.json'
}

export default app
