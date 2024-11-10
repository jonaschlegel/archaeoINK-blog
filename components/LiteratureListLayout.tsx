'use client'

import { useState, useMemo } from 'react'
import LiteratureList from './LiteratureList'
import TagFilter from './TagFilter'
import Pagination from './Pagination'
import SearchBar from './SearchBar'

interface LiteratureData {
  title: string
  authors: { firstName: string; lastName: string }[]
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

interface LiteratureListLayoutProps {
  initialLiteratureData: LiteratureData[]
  title: string
}

const ITEMS_PER_PAGE = 10

const LiteratureListLayout = ({ initialLiteratureData, title }: LiteratureListLayoutProps) => {
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
      const matchesType = selectedType === '' || item.type === selectedType
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.authors.some((author) =>
          `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))
      return matchesType && matchesSearch && matchesTags
    })
  }, [initialLiteratureData, searchQuery, selectedTags, selectedType])

  const totalPages = Math.ceil(filteredLiteratureData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = filteredLiteratureData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const availableTypes = Array.from(new Set(initialLiteratureData.map((item) => item.type)))

  return (
    <div className="flex sm:space-x-24">
      {/* Sidebar for Type and Tags Filters */}
      <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] overflow-y-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
        <div className="px-6 py-4">
          <h3 className="mb-4 font-bold uppercase text-primary-500">Filter by Type</h3>
          {/* Type Filter Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="mb-4 w-full rounded-lg border px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <h3 className="mb-4 font-bold uppercase text-primary-500">Filter by Tags</h3>
          <TagFilter
            availableTags={Array.from(new Set(initialLiteratureData.flatMap((item) => item.tags)))}
            selectedTags={selectedTags}
            onTagChange={handleTagChange}
          />
        </div>
      </div>

      {/* Main Content for Search and Literature List */}
      <div className="w-full">
        <h1 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>
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
