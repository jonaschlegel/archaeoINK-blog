import LiteratureTag from './LiteratureTag'

interface TagFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onTagChange: (tags: string[]) => void
}

const TagFilter = ({ availableTags, selectedTags, onTagChange }: TagFilterProps) => {
  const sortedTags = [...availableTags].sort((a, b) => a.localeCompare(b))

  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    onTagChange(updatedTags)
  }

  return (
    <div className="mt-4 flex flex-col items-start space-y-3">
      {sortedTags.map((tag) => (
        <LiteratureTag
          key={tag}
          text={tag}
          onClick={() => handleTagClick(tag)}
          isSelected={selectedTags.includes(tag)}
        />
      ))}
    </div>
  )
}

export default TagFilter
