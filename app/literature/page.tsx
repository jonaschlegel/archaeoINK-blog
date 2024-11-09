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
      abstract: content.match(/## Abstract\s([\s\S]*?)##/)?.[1].trim() || 'No abstract available.',
      tableOfContents:
        content.match(/## Table of Contents\s([\s\S]*?)##/)?.[1].trim() ||
        'No table of contents available.',
    }
  })
}

export default function Literature() {
  const literatureData = getLiteratureData()

  return (
    <div className="pb-8 pt-6">
      <h1 className="mb-6 text-4xl font-bold">Archaeological Illustration Resources</h1>
      <LiteratureListLayout initialLiteratureData={literatureData} title="Literature Resources" />
    </div>
  )
}
