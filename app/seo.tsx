import siteMetadata from '@/data/siteMetadata';
import { Metadata } from 'next/types';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const pageImage = image ? [image] : [siteMetadata.socialBanner]
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
