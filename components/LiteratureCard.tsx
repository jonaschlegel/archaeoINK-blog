'use client'

import { useState } from 'react'
import LiteratureTags from './LiteratureTag'

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
}: LiteratureProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formattedAuthors = authors.length
    ? authors.map((author) => `${author.firstName} ${author.lastName}`).join(', ')
    : 'No authors listed'

  return (
    <div className="rounded-lg border p-2 shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <button
          className="flex items-center justify-center text-sm text-primary-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>
      </div>
      <p className="text-gray-700">
        By {formattedAuthors} ({year})
      </p>
      {isExpanded && (
        <>
          <p>
            <strong>Publisher:</strong> {publisher}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Abstract:</strong> {abstract}
          </p>
          <p>
            <strong>Table of Contents:</strong>
          </p>
          <pre>{tableOfContents}</pre>

          {externalLink && (
            <p>
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline"
              >
                Purchase or Access
              </a>
            </p>
          )}
          {reviewsLink && (
            <p>
              <a
                href={reviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline"
              >
                Read Reviews
              </a>
            </p>
          )}

          {isbn && (
            <p>
              <strong>ISBN:</strong> {isbn}
            </p>
          )}
          {doi && (
            <p>
              <strong>DOI:</strong> {doi}
            </p>
          )}

          <div className="mt-4">
            <p>
              <strong>Tags:</strong>
            </p>
            <LiteratureTags tags={tags} />
          </div>
        </>
      )}
    </div>
  )
}

export default LiteratureCard
