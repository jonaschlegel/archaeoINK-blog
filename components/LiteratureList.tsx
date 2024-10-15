import LiteratureCard from './LiteratureCard'

interface LiteratureListProps {
  literatureData: any[]
}

const LiteratureList = ({ literatureData }: LiteratureListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {literatureData.map((resource) => (
        <LiteratureCard key={resource.title} {...resource} />
      ))}
    </div>
  )
}

export default LiteratureList
