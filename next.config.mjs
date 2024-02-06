import withBundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import { withContentlayer } from 'next-contentlayer'
import rehypeCitation from 'rehype-citation'
import remarkFootnotes from 'remark-footnotes'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFootnotes],
    rehypePlugins: [[rehypeCitation, { bibliography: './data/reference-data.bib' }]],
  },
})

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com www.google-analytics.com assets.mailerlite.com archaeoink.ck.page;
  style-src 'self' 'unsafe-inline' *.googleapis.com cdn.jsdelivr.net assets.mailerlite.com;
  frame-src youtube.com www.youtube.com timlrx.shinyapps.io;
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self' fonts.gstatic.com cdn.jsdelivr.net cdn.scite.ai;
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['app', 'components', 'layouts', 'scripts'],
  },
  images: {
    domains: ['picsum.photos'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default withMDX(withContentlayer(withBundleAnalyzer(nextConfig)))
