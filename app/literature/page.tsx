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
    const { data } = matter(markdownWithMeta)
    return {
      title: data.title,
      author: data.author,
      year: data.year,
      tags: data.tags,
      keywords: data.keywords,
      pages: data.pages,
      chapters: data.chapters,
      review: data.review,
      link: data.link,
      buyLink: data.buyLink,
      goodreadsLink: data.goodreadsLink,
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
