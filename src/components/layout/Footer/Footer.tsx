import Link from 'next/link'
import { FooterProps } from '@/types/layout'
import { navigation, socialLinks, SITE_NAME, SITE_DESCRIPTION } from '@/constants/navigation'
import { cn } from '@/lib/utils'

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn(
      "bg-light-primary dark:bg-dark-primary border-t border-light-muted/30 dark:border-dark-muted/30",
      className
    )}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterSection
            title="About"
            content={
              <p className="mt-4 text-base text-light-muted dark:text-dark-muted">
                {SITE_DESCRIPTION}
              </p>
            }
          />
          <FooterSection
            title="Navigation"
            content={
              <ul className="mt-4 space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            }
          />
          <FooterSection
            title="Social"
            content={
              <ul className="mt-4 space-y-4">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            }
          />
        </div>
        <div className="mt-8 border-t border-light-muted/30 dark:border-dark-muted/30 pt-8">
          <p className="text-base text-light-muted dark:text-dark-muted text-center">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

interface FooterSectionProps {
  title: string
  content: React.ReactNode
}

function FooterSection({ title, content }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-light-muted dark:text-dark-muted tracking-wider uppercase">
        {title}
      </h3>
      {content}
    </div>
  )
} 
