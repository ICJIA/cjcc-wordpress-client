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
    }
  }
}
