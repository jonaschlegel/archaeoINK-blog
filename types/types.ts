export interface LiteratureData {
  title: string
  authors: { firstName: string; lastName: string }[]
  year: string
  publisher: string
  externalLink?: string
  reviewsLink?: string
  type: string
  category: string
  tags: string[]
  isbn?: string
  doi?: string
  abstract: string
  tableOfContents: string
  coverImage?: string
  hidden?: boolean
  purposeAndAudience: string
  reviews: string
  keyExcerpt: string
}
