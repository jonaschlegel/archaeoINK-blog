import LiteratureListLayout from '@/components/LiteratureListLayout'
import { genPageMetadata } from 'app/seo'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export const metadata = genPageMetadata({ title: 'Literature Resources' })

const getLiteratureData = () => {
  const dirPath = path.join(process.cwd(), 'data/resources/illustrations')
  const files = fs.readdirSync(dirPath)
  return files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(dirPath, filename), 'utf-8')
    const { data, content } = matter(markdownWithMeta)

    return {
      title: data.title,
      authors: data.authors,
      year: data.year,
      publisher: data.publisher,
      externalLink: data.externalLink || '',
      reviewsLink: data.reviewsLink || '',
      type: data.type,
      category: data.category,
      tags: data.tags,
      isbn: data.isbn || '',
      doi: data.doi || '',
      coverImage: data.coverImage,
      abstract: content.match(/## Abstract\s([\s\S]*?)##/)?.[1].trim() || 'No abstract available.',
      tableOfContents:
        content.match(/## Table of Contents\s([\s\S]*?)##/)?.[1].trim() ||
        'No table of contents available.',
      hidden: data.hidden || false,
      purposeAndAudience:
        content.match(/## Purpose and Audience\s([\s\S]*?)##/)?.[1].trim() ||
        'No information available.',
      reviews: content.match(/## Reviews\s([\s\S]*?)##/)?.[1].trim() || 'No reviews available.',
      keyExcerpt:
        content.match(/## Key Excerpt\s([\s\S]*?)##/)?.[1].trim() || 'No key excerpt available.',
    }
  })
}

export default function Literature() {
  const literatureData = getLiteratureData()

  return (
    <div className="pb-8 pt-6">
      <h1 className="mb-6 text-4xl font-bold">Archaeological Illustration Resources</h1>
      <div className="mb-6">
        A collection of literature resources related to archaeological illustration, including
        books, articles, and other publications. This list is a work in progress and will be updated
        as new resources are discovered. If you have a resource you would like to add to this list,
        please contact me.
      </div>
      <LiteratureListLayout initialLiteratureData={literatureData} />
    </div>
  )
}
