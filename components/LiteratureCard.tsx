// components/LiteratureCard.tsx
'use client'

import { useState } from 'react'

interface LiteratureProps {
  title: string
  author: string
  year: number
  tags: string[]
  keywords: string[]
  pages: string
  chapters: string[]
  buyLink: string
  goodreadsLink: string
  review: string
}

const LiteratureCard = ({
  title,
  author,
  year,
  tags,
  keywords,
  pages,
  chapters,
  buyLink,
  goodreadsLink,
  review,
}: LiteratureProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
        By {author} ({year})
      </p>
      {isExpanded && (
        <>
          <p>
            <strong>Pages:</strong> {pages}
          </p>
          <p>
            <strong>Chapters:</strong> {chapters.join(', ')}
          </p>
          <p>
            <strong>Review:</strong> {review}
          </p>
          <p>
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 underline"
            >
              Buy this book
            </a>
          </p>
          <p>
            <a
              href={goodreadsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 underline"
            >
              Find reviews on Goodreads
            </a>
          </p>
          <div className="mt-4">
            <p>
              <strong>Tags:</strong> {tags.join(', ')}
            </p>
            <p>
              <strong>Keywords:</strong> {keywords.join(', ')}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default LiteratureCard
