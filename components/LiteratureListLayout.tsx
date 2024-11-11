'use client'

import { useState, useMemo } from 'react'
import LiteratureList from './LiteratureList'
import TagFilter from './TagFilter'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import { LiteratureData } from '../types/types'

interface LiteratureListLayoutProps {
  initialLiteratureData: LiteratureData[]
}

const ITEMS_PER_PAGE = 10

const LiteratureListLayout = ({ initialLiteratureData }: LiteratureListLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags)
    setCurrentPage(1)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    )
    setCurrentPage(1)
  }

  const filteredLiteratureData = useMemo(() => {
    return initialLiteratureData.filter((item) => {
      const isVisible = !item.hidden
      const matchesType = selectedType === '' || item.literatureType === selectedType
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authors.some((author) =>
          `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))
      return isVisible && matchesType && matchesSearch && matchesTags
    })
  }, [initialLiteratureData, searchQuery, selectedTags, selectedType])

  const totalPages = Math.ceil(filteredLiteratureData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = filteredLiteratureData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const availableTags = Array.from(
    new Set(initialLiteratureData.filter((item) => !item.hidden).flatMap((item) => item.tags))
  )

  const availableTypes = Array.from(
    new Set(
      initialLiteratureData
        .map((item) => item.literatureType?.trim())
        .filter((type) => type && type.length > 0)
    )
  ).sort((a, b) => a.localeCompare(b))

  return (
    <div className="flex sm:space-x-24">
      <div className="hidden h-full max-h-screen min-w-[200px] max-w-[280px] overflow-y-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
        <div className="px-6 py-4">
          <h3 className="mb-4 font-bold uppercase text-primary-500">Filter by Type</h3>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="mb-4 w-full rounded-lg border px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="">All Types</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <h3 className="mb-4 font-bold uppercase text-primary-500">Filter by Keywords</h3>
          <TagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagChange={handleTagChange}
          />
        </div>
      </div>

      <div className="w-full">
        <SearchBar onSearch={handleSearch} />
        <LiteratureList literatureData={currentItems} onTagClick={handleTagClick} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default LiteratureListLayout
