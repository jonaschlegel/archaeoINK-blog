/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'archaeoINK',
  author: 'Jona Schlegel',
  headerTitle: 'archaeoINK',
  description: 'A journey through archaeology, illustration, and scientific communication',
  language: 'en-us',
  siteUrl: 'https://archaeoink.com/',
  siteRepo: 'https://github.com/jonaschlegel/archaeoINK-blog',
  image: '/static/img/jona-schlegel.png',
  socialBanner: '/static/img/social-banner.jpg',
  email: 'jona.schlegel@gmail.com',
  github: 'https://github.com/jonaschlegel',
  twitter: 'https://twitter.com/jonaschlegel',
  bluesky: 'https://bsky.app/profile/jonaschlegel.bsky.social',
  linkedin: 'https://www.linkedin.com/in/jona-schlegel-942879153/',
  locale: 'en-US',
  analytics: {
    googleAnalytics: {
      googleAnalyticsId: '',
    },
  },
  newsletter: {
    provider: 'ConvertKit',
  },
  comment: {
    provider: '',
  },
  search: {
    provider: 'kbar', // Choose 'kbar' or 'algolia' or another provider
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
  },
}

module.exports = siteMetadata
