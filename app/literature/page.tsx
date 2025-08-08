import LiteratureListLayout from '@/components/LiteratureListLayout'
import { genPageMetadata } from 'app/seo'
import fs from 'fs'
import matter from 'gray-matter'
import { Metadata } from 'next/types'
import path from 'path'

export const metadata: Metadata = genPageMetadata({
  title: 'Illustration Literature Resources',
  description:
    'Comprehensive collection of literature and resources on archaeological illustration, digital documentation, and heritage visualization techniques.',
  keywords: [
    'archaeological illustration literature',
    'digital archaeology resources',
    'heritage visualization',
    'archaeological documentation',
    'scientific illustration',
    '3D modeling archaeology',
  ],
})

const getLiteratureData = () => {
  const dirPath = path.join(process.cwd(), 'data/resources/illustrations')
  const files = fs.readdirSync(dirPath)
   
  return (files as any).map((filename: any) => {
    const markdownWithMeta = fs.readFileSync(path.join(dirPath, filename), 'utf-8')
    const { data, content } = matter(markdownWithMeta)

    return {
      title: data.title,
      authors: data.authors,
      year: data.year,
      publisher: data.publisher,
      externalLink: data.externalLink || '',
      reviewsLink: data.reviewsLink || '',
      literatureType: data.literatureType || '',
      category: data.category,
      tags: data.tags || [],
      isbn: data.isbn || '',
      doi: data.doi || '',
      coverImage: data.coverImage,
       
      abstract:
        (content as any).match(/## Abstract\s([\s\S]*?)##/)?.[1].trim() || 'No abstract available.',
      tableOfContents:
         
        (content as any).match(/## Table of Contents\s([\s\S]*?)##/)?.[1].trim() ||
        'No table of contents available.',
      hidden: data.hidden || false,
      purposeAndAudience:
         
        (content as any).match(/## Purpose and Audience\s([\s\S]*?)##/)?.[1].trim() ||
        'No information available.',
       
      reviews:
        (content as any).match(/## Reviews\s([\s\S]*?)##/)?.[1].trim() || 'No reviews available.',
      keyExcerpt:
         
        (content as any).match(/## Key Excerpt\s([\s\S]*?)##/)?.[1].trim() ||
        'No key excerpt available.',
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
