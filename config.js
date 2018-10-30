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
  staticRoutes: [
    '/',
    '/search',
    '/news',
    '/preview',
    '/contact',
    '/councils',
    '/sandbox'
  ],
  mapDataRoute: '~/assets/data/map.json',
  maxPaginationItems: 5,
  ALGOLIA_APP_ID: 'NNK00XWL8O',
  ALGOLIA_SEARCH_ONLY_KEY: '658048c35e8dab184a47663f2dfd8461',
  ALGOLIA_SEARCH_INDEX_NAME: 'cjcc',
  emailjsUserID: 'user_zgVUWqp0CAzip0NiHfNFb'
}

export default app
