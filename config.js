const app = {
  clientURL: 'http://localhost:5000',
  apiUrl: 'http://wpdev:8888/wp-json/',
  frontPagePosts: 3,
  launchWebpackMonitor: false,
  redirect404: '/404.html',
  getArticleBySlug: 'wp/v2/articles?slug=',
  getPostBySlug: 'wp/v2/posts?slug=',
  getPageBySlug: 'wp/v2/pages?slug=',
  getRoutes: 'wp/v2/routes/',
  contentCacheEnabled: true,
  contentCacheSize: 25
}

export default app
