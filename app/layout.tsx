import 'css/tailwind.css';
import 'pliny/search/algolia.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';
import StructuredData from '@/components/StructuredData';
import siteMetadata from '@/data/siteMetadata';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next/types';
import { Analytics, AnalyticsConfig } from 'pliny/analytics';
import { SearchConfig, SearchProvider } from 'pliny/search';
import { ThemeProviders } from './theme-providers';
import Tracking from './Tracking';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
    creator: '@jonaschlegel',
    site: '@jonaschlegel',
  },
  verification: {
    google: '',
    yandex: '',
    yahoo: '',
    other: {
      me: [siteMetadata.email!, siteMetadata.linkedin!],
    },
  },
  category: 'Archaeology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <StructuredData
          type="WebSite"
          data={{
            name: siteMetadata.title,
            description: siteMetadata.description,
            url: siteMetadata.siteUrl,
            inLanguage: 'en-US',
          }}
        />
        <StructuredData
          type="Organization"
          data={{
            name: siteMetadata.title,
            description: siteMetadata.description,
          }}
        />
        <StructuredData
          type="Person"
          data={{
            name: siteMetadata.author,
            description:
              'Archaeologist and Illustrator specializing in scientific communication and heritage visualization',
          }}
        />
        <ThemeProviders>
          {
            Analytics({
              analyticsConfig: siteMetadata.analytics as AnalyticsConfig,
            }) as React.ReactElement
          }
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              {
                SearchProvider({
                  searchConfig: siteMetadata.search as SearchConfig,
                  children: (
                    <>
                      <Header />
                      <main className="mb-auto">{children}</main>
                    </>
                  ),
                }) as React.ReactElement
              }
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
        <Tracking />
      </body>
    </html>
  )
}
