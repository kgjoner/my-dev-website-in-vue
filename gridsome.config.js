// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Kaio G. | Web Developer',
  plugins: [
    {
      use: 'gridsome-plugin-vue-toasted',
      options: {
        iconPack: 'fontawesome',
        duration: 5000
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: './src/data/posts/*.md'
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.ANALYTICS_KEY
      }
    }
  ],
  templates: {
    Post: [{
      path: node => `/blog/${node.slug}`
    }]
  }
}
