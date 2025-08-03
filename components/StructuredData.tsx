import siteMetadata from '@/data/siteMetadata'

interface StructuredDataProps {
  type: 'WebSite' | 'BlogPosting' | 'Person' | 'Organization' | 'BreadcrumbList'
  data: Record<string, any>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    }

    switch (type) {
      case 'WebSite':
        return {
          ...baseData,
          url: siteMetadata.siteUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteMetadata.siteUrl}/blog?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }

      case 'BlogPosting':
        return {
          ...baseData,
          publisher: {
            '@type': 'Person',
            name: siteMetadata.author,
            url: siteMetadata.siteUrl,
            sameAs: [siteMetadata.github!, siteMetadata.linkedin!, siteMetadata.twitter!],
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url,
          },
        }

      case 'Person':
        return {
          ...baseData,
          '@id': `${siteMetadata.siteUrl}#person`,
          name: siteMetadata.author,
          url: siteMetadata.siteUrl,
          image: {
            '@type': 'ImageObject',
            url: `${siteMetadata.siteUrl}${siteMetadata.image}`,
          },
          sameAs: [
            siteMetadata.github!,
            siteMetadata.linkedin!,
            siteMetadata.twitter!,
            siteMetadata.bluesky!,
          ],
          jobTitle: 'Archaeologist & Illustrator',
          worksFor: {
            '@type': 'Organization',
            name: 'archaeoINK',
          },
          knowsAbout: [
            'Archaeology',
            'Archaeological Illustration',
            'Scientific Communication',
            'Digital Archaeology',
            'Heritage Visualization',
          ],
        }

      case 'Organization':
        return {
          ...baseData,
          '@id': `${siteMetadata.siteUrl}#organization`,
          name: siteMetadata.title,
          url: siteMetadata.siteUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
          },
          founder: {
            '@type': 'Person',
            name: siteMetadata.author,
          },
          sameAs: [siteMetadata.github!, siteMetadata.twitter!],
        }

      case 'BreadcrumbList':
        return baseData

      default:
        return baseData
    }
  }

  const structuredData = generateStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
