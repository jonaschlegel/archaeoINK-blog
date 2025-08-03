import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { Metadata } from 'next/types'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 5

export const metadata: Metadata = genPageMetadata({
  title: 'Blog',
  description:
    'Latest articles on archaeology, illustration, and scientific communication. Explore insights on archaeological methods, digital drawing techniques, and heritage visualization.',
  keywords: [
    'archaeology blog',
    'archaeological articles',
    'illustration tutorials',
    'scientific communication',
    'archaeological methods',
    'heritage studies',
  ],
})

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const initialDisplayPosts = (posts as any).slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    totalPages: (globalThis as any).Math.ceil((posts as any).length / POSTS_PER_PAGE),
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const postsWithReadingTime = (posts as any).map((post: any) => ({
    ...post,
  }))

  return (
    <ListLayoutWithTags
      posts={postsWithReadingTime}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
