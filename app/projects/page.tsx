import Card from '@/components/Card'
import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next/types'

export const metadata: Metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Explore web development and archaeological projects by Jona Schlegel. From digital tools for archaeology to visualization platforms and open-source contributions.',
  keywords: [
    'archaeological projects',
    'web development',
    'digital archaeology tools',
    'open source',
    'visualization projects',
    'heritage technology',
  ],
})

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Web development projects I am working on or have built over the years. More will come.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            { }
            {(projectsData as any).map((d: any) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                keyFeatures={d.keyFeatures}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
