import MDXWrapper from '@/components/MDXWrapper';
import AuthorLayout from '@/layouts/AuthorLayout';
import { genPageMetadata } from 'app/seo';
import { allAuthors, Authors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';

export const metadata = genPageMetadata({
  title: 'About',
  description:
    'Learn about Jona Schlegel, archaeologist and illustrator behind archaeoINK. Discover the intersection of archaeology, digital illustration, and scientific communication.',
  keywords: [
    'Jona Schlegel',
    'archaeologist',
    'archaeological illustrator',
    'scientific communication',
    'heritage visualization',
    'about archaeoINK',
  ],
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXWrapper code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
