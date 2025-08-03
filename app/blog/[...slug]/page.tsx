import 'css/prism.css';
import 'katex/dist/katex.css';
import { components } from '@/components/MDXComponents';
import MDXWrapper from '@/components/MDXWrapper';
import PageTitle from '@/components/PageTitle';
import siteMetadata from '@/data/siteMetadata';
import PostBanner from '@/layouts/PostBanner';
import PostLayout from '@/layouts/PostLayout';
import PostSimple from '@/layouts/PostSimple';
import { generateBlogOGImage } from '@/lib/og-image';
import type { Authors, Blog } from 'contentlayer/generated';
import { allAuthors, allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next/types';
import { coreContent, sortPosts } from 'pliny/utils/contentlayer';

const isProduction = process.env.NODE_ENV === 'production'
const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 225
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const { slug: slugArray } = await params
  const slug = decodeURI(slugArray.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)

  // Use existing images if available, otherwise generate OG image
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  } else {
    // Generate automatic OG image for this blog post
    const autoOGImage = generateBlogOGImage(post.title, post.summary, post.tags)
    imageList = [autoOGImage]
  }

  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors:
      authors.length > 0 ? authors.map((name) => ({ name })) : [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    publisher: siteMetadata.author,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
      section: 'Archaeology',
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
      creator: '@jonaschlegel',
      site: '@jonaschlegel',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await params
  const slug = decodeURI(slugArray.join('/'))
  const sortedPosts = sortPosts(allBlogs) as Blog[]
  const postIndex = sortedPosts.findIndex((p) => p.slug === slug)
  const prev = coreContent(sortedPosts[postIndex + 1])
  const next = coreContent(sortedPosts[postIndex - 1])
  const post = sortedPosts.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const readingTime = calculateReadingTime(post.body?.raw || post.summary || '')

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      {isProduction && post && 'draft' in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
            <div className="font-bold">{post.summary}</div>
            <div className="text-sm text-gray-500">{readingTime}</div>
            <MDXWrapper code={post.body.code} components={components} toc={post.toc} />
          </Layout>
        </>
      )}
    </>
  )
}
