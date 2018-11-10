# cjcc-nuxt-client

> A Wordpress API client written in [Nuxt.js](https://nuxtjs.org)

## About the Illinois CJCC

Illinois Criminal Justice Coordinating Councils (CJCCs) are strategic planning bodies made up local criminal justice policymakers, practitioners, and community members that serve as a forum for collaborating on policy, programs, and operations. As part of the National Criminal Justice Reform Project (NCJRP), the Illinois Criminal Justice Information Authority (ICJIA) and Loyal University’s Center for Criminal Justice Research, Policy and Practice, are partnering to support the formation of Criminal Justice Coordinating Councils. We provide:

- Research support
- Technical assistance
- Funding opportunities for planning and program implementation

## Client Installation

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

### Wordpress REST API-to-local API:

- https://github.com/ICJIA/cjcc-wordpress-client/blob/master/api.js

#### Email:

- [EmailJS](http://www.emailjs.com/)
- [Mailgun](https://www.mailgun.com)

#### Search:

- [Algolia](https://www.algolia.com/products)
- [Algolia Site Indexer](https://github.com/ICJIA/cjcc-wordpress-client/blob/master/algolia.js)

## Wordpress Installation

### Custom endpoints

See `icjia-functions.php` in `/wordpress`

### Advanced Custom fields

See `acf-export-*.json` in `/wordpress`

### Custom post types

See `cpt.json` in `/wordpress`

### Plugins

> ACF TO REST API

Exposes Advanced Custom Fields Endpoints in the WordPress REST API

> Advanced Custom Fields

Update posts and pages with custom fields.

> Custom Post Type UI

Admin panel for creating custom post types and custom taxonomies in WordPress

> Disable Comments

Permanently disable comments from all posts.

> FakerPress

Generate mock data for testing.

> Rename Default Post

Rename default "post" to "news".

> Smush

Reduce image file sizes, improve performance.

> Tuxedo Big File Uploads

Adjust upload file size from default 2mb.

> [JAMstack Deployments](https://github.com/crgeary/wp-jamstack-deployments)

Trigger Netlify build with hook. Hit `deploy` in wp-admin to trigger Netlify webbook.

> Better REST API Featured Images

Adds a top-level field with featured image data including available sizes and URLs to the post object returned by the REST API.

### Client URL

[https://cjcc.icjia.cloud](https://cjcc.icjia.cloud)

### Wordpress API:

[https://cjcc.icjia-api.cloud/wp-json](https://cjcc.icjia-api.cloud/wp-json)
