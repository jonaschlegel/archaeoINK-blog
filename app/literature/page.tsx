import LiteratureList from '@/components/LiteratureList'
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

    const abstractMatch = content.match(/## Abstract\s([\s\S]*?)##/)
    const tableOfContentsMatch = content.match(/## Table of Contents\s([\s\S]*?)##/)
    const citationInfoMatch = content.match(/## Citation Info\s([\s\S]*?)##/)

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
      abstract: abstractMatch ? abstractMatch[1].trim() : 'No abstract available.',
      tableOfContents: tableOfContentsMatch
        ? tableOfContentsMatch[1].trim()
        : 'No table of contents available.',
      citationInfo: citationInfoMatch ? citationInfoMatch[1].trim() : 'No citation info available.',
    }
  })
}

export default function Literature() {
  const literatureData = getLiteratureData()

  return (
    <div className="space-y-5 pb-8 pt-6">
      <h1 className="text-4xl font-bold">Archaeological Illustration Resources</h1>
      <LiteratureList literatureData={literatureData} />
    </div>
  )
}
