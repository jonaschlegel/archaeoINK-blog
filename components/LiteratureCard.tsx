'use client'

import { useState } from 'react'
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
  onTagClick,
}: LiteratureProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formattedAuthors = authors.length
    ? authors.map((author) => `${author.firstName} ${author.lastName}`).join(', ')
    : 'No authors listed'

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex w-full cursor-pointer overflow-hidden rounded-lg border bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
        isExpanded ? 'max-h-[600px]' : 'max-h-[180px]'
      }`}
      onClick={toggleExpand}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleExpand()
        }
      }}
    >
      {/* Content Section */}
      <div className="flex-1 space-y-2 overflow-hidden transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            <p className="text-md text-gray-600">
              By {formattedAuthors} • {year}
            </p>
            <p className="mt-1 text-sm text-gray-600">{publisher}</p>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-2 flex flex-wrap">
          {tags.map((tag) => (
            <LiteratureTag key={tag} text={tag} onClick={onTagClick} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LiteratureCard
