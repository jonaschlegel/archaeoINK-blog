'use client'

import Link from '@/components/Link'

interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Pagination = ({ totalPages, currentPage, setCurrentPage }: PaginationProps) => {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="text-primary-500 hover:text-primary-600"
          >
            Previous
          </button>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="text-primary-500 hover:text-primary-600"
          >
            Next
          </button>
        )}
      </nav>
    </div>
  )
}

export default Pagination
