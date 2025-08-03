import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const totalPages = (globalThis as any).Math.ceil((allBlogs as any).length / POSTS_PER_PAGE)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const paths = (globalThis as any).Array.from({ length: totalPages }, (_: any, i: any) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

export default async function Page({ params }: { params: any }) {
  const { page } = await params
  const posts = allCoreContent(sortPosts(allBlogs))
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const pageNumber = (globalThis as any).parseInt(page as string)
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

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
