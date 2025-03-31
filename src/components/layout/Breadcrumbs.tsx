'use client'

import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  href: string
  label: string
  isLast: boolean
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  // Split pathname and create breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    return {
      href,
      label,
      isLast: index === pathSegments.length - 1
    }
  })

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text">
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </li>
        {breadcrumbs.map(({ href, label, isLast }) => (
          <li key={href}>
            <div className="flex items-center">
              <span className="text-light-muted dark:text-dark-muted mx-2">/</span>
              {isLast ? (
                <span className="text-light-text dark:text-dark-text">{label}</span>
              ) : (
                <Link href={href} className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text">
                  {label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
} 
