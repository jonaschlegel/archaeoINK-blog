import MDXWrapper from '@/components/MDXWrapper';
import AuthorLayout from '@/layouts/AuthorLayout';
import { genPageMetadata } from 'app/seo';
import { allAuthors, Authors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';

export const metadata = genPageMetadata({
  title: 'About',
  openGraph: {
    images: ['/static/img/og/social-banner-about.jpg'],
  },
  twitter: {
    images: ['/static/img/og/social-banner-about.jpg'],
  },
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
