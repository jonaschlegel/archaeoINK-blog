'use client'

import { useState } from 'react'
import LiteratureCard from './LiteratureCard'

interface LiteratureProps {
  literatureData: {
    title
    author
    year
    tags
    keywords
    pages
    chapters
    buyLink
    goodreadsLink
    review
  }[]
}

const LiteratureList = ({ literatureData }: LiteratureProps) => {
  const [filter, setFilter] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const allTagsAndKeywords = Array.from(
    new Set(literatureData.flatMap((resource) => [...resource.tags, ...resource.keywords]))
  )

  const filteredData = filter
    ? literatureData.filter(
        (resource) => resource.tags.includes(filter) || resource.keywords.includes(filter)
      )
    : literatureData

  return (
    <>
      <input
        type="text"
        placeholder="Filter by keyword or tag"
        className="w-full border p-2"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && (
        <div className="mt-2 max-h-40 overflow-auto border bg-white p-2 shadow-lg">
          {allTagsAndKeywords.map((keyword) => (
            <div
              key={keyword}
              role="button"
              tabIndex={0}
              className="cursor-pointer hover:bg-gray-200"
              onMouseDown={() => setFilter(keyword)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setFilter(keyword)
                }
              }}
            >
              {keyword}
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4">
        {filteredData.map((resource) => (
          <LiteratureCard key={resource.title} {...resource} />
        ))}
      </div>
    </>
  )
}

export default LiteratureList
