'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { HeaderProps } from '@/types/layout'
import { navigation, SITE_NAME } from '@/constants/navigation'
import { cn } from '@/lib/utils'

export default function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-sm border-b border-light-accent dark:border-dark-accent",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold text-light-text dark:text-dark-text hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
              >
                {SITE_NAME}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-light-text dark:text-dark-text hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <MobileMenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
    </header>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  )
}

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <div className="sm:hidden">
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center p-2 rounded-md text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

interface MobileMenuProps {
  isOpen: boolean
}

function MobileMenu({ isOpen }: MobileMenuProps) {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
      <div className="pt-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block pl-3 pr-4 py-2 text-base font-medium text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
} 