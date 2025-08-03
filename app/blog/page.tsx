import ListLayoutWithTags from '@/layouts/ListLayoutWithTags';
import { genPageMetadata } from 'app/seo';
import { allBlogs } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
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
  openGraph: {
    images: ['/static/img/og/social-banner-blog.jpg'],
  },
  twitter: {
    images: ['/static/img/og/social-banner-blog.jpg'],
  },
})

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
