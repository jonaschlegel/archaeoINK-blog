import React from 'react'

type NewsletterButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  // Add any other props you might need
}

const NewsletterButton: React.FC<NewsletterButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring ${className}`}
    >
      {children}
    </button>
  )
}

export default NewsletterButton
