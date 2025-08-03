import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import tagData from 'app/tag-data.json'
import { allBlogs } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import type { Metadata } from 'next/types'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export async function generateMetadata({
  params,
}: {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  params: any
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
}) {
  const { tag } = await params
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const decodedTag = (globalThis as any).decodeURI(tag)
  return genPageMetadata({
    title: decodedTag,
    description: `${siteMetadata.title} ${decodedTag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${decodedTag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const tagCounts = tagData as any
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const tagKeys = (globalThis as any).Object.keys(tagCounts)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const paths = (tagKeys as any).map((tag: any) => ({
    tag: tag,
  }))
  return paths
}

export default async function TagPage({ params }: { params: any }) {
  const { tag } = await params
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const decodedTag = (globalThis as any).decodeURI(tag)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const title =
    (decodedTag as any)[0].toUpperCase() + (decodedTag as any).split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (allBlogs as any).filter(
        (post: any) => post.tags && (post.tags as any).map((t: any) => slug(t)).includes(decodedTag)
      )
    )
  )
  return <ListLayout posts={filteredPosts as any} title={title} />
}
