import LiteratureTag from './LiteratureTag'

interface TagFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onTagChange: (tags: string[]) => void
}

const TagFilter = ({ availableTags, selectedTags, onTagChange }: TagFilterProps) => {
  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    onTagChange(updatedTags)
  }

  return (
    <div className="mt-4 flex flex-col items-start space-y-3">
      {availableTags.map((tag) => (
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
