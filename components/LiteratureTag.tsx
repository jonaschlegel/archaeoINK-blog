interface LiteratureTagProps {
  text: string
  onClick: (tag: string) => void
  isSelected?: boolean
}

const LiteratureTag = ({ text, onClick, isSelected = false }: LiteratureTagProps) => {
  const handleClick = () => onClick(text)

  return (
    <button
      onClick={handleClick}
      className={`mr-3 text-left text-sm font-medium uppercase hover:text-primary-600 dark:hover:text-primary-400 ${
        isSelected ? 'font-semibold text-primary-600' : ''
      }`}
    >
      {text.split(' ').join('-')}
    </button>
  )
}

export default LiteratureTag
