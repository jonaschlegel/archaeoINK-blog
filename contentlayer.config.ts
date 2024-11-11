import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import path from 'path'
import {
  extractTocHeadings,
  remarkCodeTitles,
  remarkExtractFrontmatter,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import remarkFootnotes from 'remark-footnotes'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import siteMetadata from './data/siteMetadata'

const root = process.cwd()

/**
 * Remove yyyy-mm-dd and extension in file path to generate slug
 */
function formatSlug(slug) {
  const regex = /(\d{4})-(\d{2})-(\d{2})-/g
  return slug.replace(regex, '')
}

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => formatSlug(doc._raw.flattenedPath.replace(/^.+?(\/)/, '')),
  },
  path: {
    type: 'string',
    resolve: (doc) => formatSlug(doc._raw.flattenedPath),
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}
export const Literature = defineDocumentType(() => ({
  name: 'Literature',
  filePathPattern: 'data/resources/illustrations/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    authors: { type: 'list', of: { type: 'string' } },
    year: { type: 'string', required: true },
    publisher: { type: 'string', required: true },
    externalLink: { type: 'string' },
    reviewsLink: { type: 'string' },
    literatureType: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    isbn: { type: 'string' },
    doi: { type: 'string' },
    abstract: { type: 'string', required: true },
    tableOfContents: { type: 'string', required: true },
    coverImage: { type: 'string', required: true },
    hidden: { type: 'boolean', default: false },
    purposeAndAudience: { type: 'string' },
    reviews: { type: 'string' },
    keyExcerpt: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'json' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${formatSlug(
          doc._raw.flattenedPath.replace(/^.+?(\/)/, '')
        )}`,
      }),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    instagram: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors, Literature],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      // remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      [remarkFootnotes, { inlineNotes: true }],
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      // rehypeKatex,
      // @ts-ignore
      [rehypeCitation, { path: path.join(root, 'data'), linkCitations: true }],
      // [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      // @ts-ignore
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
    createSearchIndex(allBlogs)
  },
})
