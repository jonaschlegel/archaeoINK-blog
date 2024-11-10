'use client'

import { useState, useMemo } from 'react'
import LiteratureList from './LiteratureList'
import SearchBar from './SearchBar'
import TagFilter from './TagFilter'
import { LiteratureData } from '../types/types'

interface LiteratureFilterProps {
  initialLiteratureData: LiteratureData[]
}

const LiteratureFilter = ({ initialLiteratureData }: LiteratureFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [displayLimit, setDisplayLimit] = useState(10)

  const handleSearch = (query: string) => setSearchQuery(query)
  const handleTagChange = (tags: string[]) => setSelectedTags(tags)

  const onTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    )
  }

  const filteredLiteratureData = useMemo(() => {
    return initialLiteratureData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authors.some((author) =>
          `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))
      return matchesSearch && matchesTags
    })
  }, [initialLiteratureData, searchQuery, selectedTags])

  const allTags = Array.from(new Set(initialLiteratureData.flatMap((item) => item.tags)))

  const displayedLiteratureData = filteredLiteratureData.slice(0, displayLimit)

  const handleLoadMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 10)
  }

  return (
    <div className="flex space-x-6">
      <div className="w-1/4 rounded-lg bg-gray-100 p-4 shadow-md">
        <h2 className="mb-4 justify-center text-lg font-semibold">Filter by Keywords</h2>
        <TagFilter
          availableTags={allTags}
          selectedTags={selectedTags}
          onTagChange={handleTagChange}
        />
      </div>

      <div className="w-3/4 space-y-5">
        <SearchBar onSearch={handleSearch} />
        <LiteratureList literatureData={displayedLiteratureData} onTagClick={onTagClick} />

        {displayLimit < filteredLiteratureData.length && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiteratureFilter
