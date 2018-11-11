import config from '@/config'
export const pageComponents = {
  data() {
    return {}
  },
  created() {
    this.contentID = this.$store.state.contentObject.id
  },
  mounted() {},
  methods: {},
  head() {
    return {
      title: this.title,
      link: [
        {
          rel: 'canonical',
          href: this.permalink
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  computed: {
    title() {
      return this.$store.state.contentObject.title.rendered
        ? this.$store.state.contentObject.title.rendered
        : config.defaultPageTitle
    },
    description() {
      const description = this.$store.state.contentObject.excerpt.rendered
        .replace(/(<([^>]+)>)/gi, '')
        .replace('\n', '')
        .replace(' &hellip;', '')
      return description
    },

    content() {
      return this.$store.state.contentObject.content.rendered
    },
    permalink() {
      if (this.$store.state.contentObject.type === 'post') {
        return config.clientURL + 'news/' + this.$store.state.contentObject.slug
      } else if (this.$store.state.contentObject.type === 'council') {
        return (
          config.clientURL + 'council/' + this.$store.state.contentObject.slug
        )
      } else {
        return config.clientURL + this.$store.state.contentObject.slug
      }
    }
  }
}
