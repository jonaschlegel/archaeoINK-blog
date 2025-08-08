import siteMetadata from '@/data/siteMetadata'

interface OGImageOptions {
  title: string
  description?: string
  type?: 'blog' | 'literature' | 'projects' | 'home' | 'page'
  tags?: string[]
  author?: string
}

export function generateOGImageURL({
  title,
  description,
  type = 'blog',
  tags = [],
  author,
}: OGImageOptions): string {
  const params = new URLSearchParams()

  params.set('title', title)

  if (description && description !== siteMetadata.description) {
    params.set('description', description)
  }

  if (type !== 'blog') {
    params.set('type', type)
  }

  if (tags.length > 0) {
    params.set('tags', tags.join(','))
  }

  if (author && author !== siteMetadata.author) {
    params.set('author', author)
  }

  return `${siteMetadata.siteUrl}/api/og?${params.toString()}`
}

// Convenience function for blog posts
export function generateBlogOGImage(title: string, description?: string, tags?: string[]): string {
  return generateOGImageURL({
    title,
    description,
    type: 'blog',
    tags,
  })
}

// Convenience function for pages
export function generatePageOGImage(
  title: string,
  description?: string,
  type: 'literature' | 'projects' | 'page' | 'blog' = 'page'
): string {
  return generateOGImageURL({
    title,
    description,
    type,
  })
}
