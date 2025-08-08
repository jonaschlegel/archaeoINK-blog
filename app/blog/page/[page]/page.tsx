import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
   
  const totalPages = (globalThis as any).Math.ceil((allBlogs as any).length / POSTS_PER_PAGE)
   
  const paths = (globalThis as any).Array.from({ length: totalPages }, (_: any, i: any) => ({
    page: (i + 1).toString(),
  }))

  return paths
}

export default async function Page({ params }: { params: any }) {
  const { page } = await params
  const posts = allCoreContent(sortPosts(allBlogs))
   
  const pageNumber = (globalThis as any).parseInt(page as string)
   
  const initialDisplayPosts = (posts as any).slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
     
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
