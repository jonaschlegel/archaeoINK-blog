interface TagsProps {
  tags: string[]
}

const LiteratureTags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-gray-200 px-2 py-1 text-xs">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default LiteratureTags
