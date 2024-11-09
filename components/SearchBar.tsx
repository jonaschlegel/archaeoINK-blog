import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full rounded-lg border px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  )
}

export default SearchBar
