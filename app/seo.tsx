import siteMetadata from '@/data/siteMetadata'
import { generatePageOGImage } from '@/lib/og-image'
import { Metadata } from 'next/types'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  type?: 'website' | 'article'
  noindex?: boolean
  canonical?: string
   
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  type = 'website',
  noindex = false,
  canonical,
  ...rest
}: PageSEOProps): Metadata {
  const fullTitle = `${title} | ${siteMetadata.title}`
  const pageDescription = description || siteMetadata.description

  // Use provided image, or generate automatic OG image
  let pageImage: string[]
  if (image) {
    pageImage = [image]
  } else {
    // Determine page type for OG image generation
    const ogType = title.toLowerCase().includes('literature')
      ? 'literature'
      : title.toLowerCase().includes('project')
        ? 'projects'
        : title.toLowerCase().includes('blog')
          ? 'blog'
          : 'page'

    const autoOGImage = generatePageOGImage(title, pageDescription, ogType)
    pageImage = [autoOGImage]
  }

  const pageKeywords = keywords ? [...siteMetadata.keywords, ...keywords] : siteMetadata.keywords

  return {
    title,
    description: pageDescription,
    keywords: pageKeywords,
    authors: authors
      ? authors.map((author) => ({ name: author }))
      : [{ name: siteMetadata.author }],
    creator: siteMetadata.author,
    publisher: siteMetadata.author,
    openGraph: {
      title: fullTitle,
      description: pageDescription,
      url: canonical || './',
      siteName: siteMetadata.title,
      images: pageImage,
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      title: fullTitle,
      card: 'summary_large_image',
      images: pageImage,
      creator: '@jonaschlegel',
      site: '@jonaschlegel',
      description: pageDescription,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonical || undefined,
    },
    ...rest,
  }
}
