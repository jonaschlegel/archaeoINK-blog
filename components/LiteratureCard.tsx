import { startTransition, useState } from 'react'
import Image from './Image'
import LiteratureTag from './LiteratureTag'

interface Author {
  lastName: string
  firstName: string
}

interface LiteratureProps {
  title: string
  authors?: Author[]
  year: string
  publisher: string
  externalLink?: string
  reviewsLink?: string
  type: string
  category: string
  tags: string[]
  isbn?: string
  doi?: string
  abstract: string
  tableOfContents: string
  coverImage?: string
  hidden?: boolean
  purposeAndAudience: string
  reviews: string
  keyExcerpt: string
  onTagClick: (tag: string) => void
}

const LiteratureCard = ({
  title,
  authors = [],
  year,
  publisher,
  externalLink,
  reviewsLink,
  type,
  category,
  tags,
  isbn,
  doi,
  abstract,
  tableOfContents,
  coverImage,
  hidden,
  purposeAndAudience,
  reviews,
  keyExcerpt,
  onTagClick,
}: LiteratureProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (hidden) return null

  const formattedAuthors = authors.length
    ? authors.map((author) => `${author.firstName} ${author.lastName}`).join(', ')
    : 'No authors listed'

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex w-full cursor-pointer rounded-md border-2 border-gray-200 border-opacity-60 p-4 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 ${
        isExpanded ? 'max-h-[600px]' : 'max-h-[180px]'
      }`}
      onClick={toggleExpand}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleExpand()
        }
      }}
    >
      {/* Cover Image Section */}
      {coverImage ? (
        <Image
          src={coverImage}
          alt={`Cover of ${title}`}
          width={96}
          height={128}
          className="mr-4 rounded-md object-cover"
        />
      ) : (
        <div className="mr-4 h-32 w-24 rounded-md bg-gray-200"></div>
      )}

      {/* Content Section */}
      <div className="flex-1 space-y-2 overflow-hidden transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-2 text-2xl font-bold leading-8 tracking-tight dark:text-white">
              {title}
            </h3>
            <p className="text-md text-gray-500 dark:text-gray-400">
              By {formattedAuthors} • {year}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{publisher}</p>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-2 flex flex-wrap">
          {tags.map((tag) => (
            <LiteratureTag key={tag} text={tag} onClick={onTagClick} />
          ))}
        </div>

        {/* Expandable section */}
        {isExpanded && (
          <div className="mt-4 max-h-[300px] space-y-4 overflow-y-auto text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold">Abstract</h4>
              <p className="text-sm">{abstract}</p>
            </div>
            <div>
              <h4 className="font-semibold">Purpose and Audience</h4>
              <p className="text-sm">{purposeAndAudience}</p>
            </div>
            {/* <div>
              <h4 className="font-semibold">Table of Contents</h4>
              <p className="text-sm">{tableOfContents}</p>
            </div> */}
            <div>
              <h4 className="font-semibold">Key Excerpt</h4>
              <p className="text-sm">{keyExcerpt}</p>
            </div>
            <div>
              <h4 className="font-semibold">Reviews</h4>
              <p className="text-sm">{reviews}</p>
              {reviewsLink && (
                <a
                  href={reviewsLink}
                  className="text-sm hover:text-primary-600 dark:hover:text-primary-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  —Read futher Reviews
                </a>
              )}
            </div>
            <div className="mt-2 flex space-x-4 text-sm">
              {externalLink && (
                <a
                  href={externalLink}
                  className="hover:text-primary-600 dark:hover:text-primary-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it here
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiteratureCard
