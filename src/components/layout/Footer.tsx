import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-light-primary dark:bg-dark-primary border-t border-light-accent dark:border-dark-accent">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-light-muted dark:text-dark-muted tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-light-muted dark:text-dark-muted">
              A modern blog built with Next.js, MDX, and Tailwind CSS.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-muted dark:text-dark-muted tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/" className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-muted dark:text-dark-muted tracking-wider uppercase">
              Social
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://twitter.com" className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com" className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-base text-light-muted dark:text-dark-muted hover:text-light-highlight dark:hover:text-dark-highlight">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-light-accent dark:border-dark-accent pt-8">
          <p className="text-base text-light-muted dark:text-dark-muted text-center">
            &copy; {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 