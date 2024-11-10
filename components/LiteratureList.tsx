import LiteratureCard from './LiteratureCard'
import { LiteratureData } from '../types/types'

interface LiteratureListProps {
  literatureData: LiteratureData[]
  onTagClick: (tag: string) => void
}

const LiteratureList = ({ literatureData, onTagClick }: LiteratureListProps) => {
  return (
    <div className="space-y-4">
      {literatureData.map((item) => (
        <LiteratureCard
          key={item.title}
          title={item.title}
          authors={item.authors}
          year={item.year}
          publisher={item.publisher}
          externalLink={item.externalLink}
          reviewsLink={item.reviewsLink}
          type={item.type}
          category={item.category}
          tags={item.tags}
          isbn={item.isbn}
          doi={item.doi}
          coverImage={item.coverImage}
          abstract={item.abstract}
          tableOfContents={item.tableOfContents}
          onTagClick={onTagClick}
          hidden={item.hidden}
        />
      ))}
    </div>
  )
}

export default LiteratureList
