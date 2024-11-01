import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 5

// Helper function to calculate reading time
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 225 // Average reading speed
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  const postsWithReadingTime = posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.body?.raw || post.summary || ''),
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
