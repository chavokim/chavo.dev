module.exports = {
  // Customize your site metadata:
  siteMetadata: {
    title: `Chavo.dev`,
    author: `Chavo Kim`,
    description: `Writings about chavokim`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/chavokim`,
      },
      {
        name: `github`,
        url: `https://github.com/chavokim`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {},
    },
  ],
}
