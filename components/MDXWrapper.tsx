import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { ReactElement } from 'react'

interface MDXWrapperProps {
  code: string
  components?: Record<string, any>
  toc?: string
}

// Wrapper component to handle type compatibility with React 19
export default function MDXWrapper({ code, components, toc }: MDXWrapperProps): ReactElement {
  return MDXLayoutRenderer({ code, components, toc }) as ReactElement
}
