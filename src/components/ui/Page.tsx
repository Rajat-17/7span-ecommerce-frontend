import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

interface PageProps {
  children: ReactNode
  title?: string
  className?: string
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', className }, ref) => {
    return (
      <>
        <Helmet>
          <title>{title ? `${title} | E-Commerce` : 'E-Commerce'}</title>
        </Helmet>
        <div ref={ref} className={className}>
          {children}
        </div>
      </>
    )
  },
)

Page.displayName = 'Page'

export default Page