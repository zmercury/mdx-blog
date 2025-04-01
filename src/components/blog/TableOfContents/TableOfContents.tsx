'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { TableOfContentsProps } from '@/types/blog'

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  // Throttle function to limit how often we update the active heading
  const throttle = (func: (...args: unknown[]) => void, limit: number) => {
    let inThrottle: boolean
    return (...args: unknown[]) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Function to check which heading is currently in view
  const checkVisibleHeadings = useCallback(() => {
    const headingElements = headings.map(({ id }) => document.getElementById(id))
    const visibleHeadings = headingElements.filter((el): el is HTMLElement => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top >= 0 && rect.top <= window.innerHeight * 0.5
    })

    if (visibleHeadings.length > 0) {
      // Get the heading that's closest to the top of the viewport
      const closestHeading = visibleHeadings.reduce((prev, current) => {
        const prevRect = prev.getBoundingClientRect()
        const currentRect = current.getBoundingClientRect()
        return Math.abs(currentRect.top) < Math.abs(prevRect.top) ? current : prev
      })

      setActiveId(closestHeading.id)
    }
  }, [headings])

  // Throttled version of checkVisibleHeadings
  const throttledCheck = useCallback(
    () => throttle(checkVisibleHeadings, 100),
    [checkVisibleHeadings]
  )

  useEffect(() => {
    // Check visible headings on mount and when headings change
    checkVisibleHeadings()

    const handleScroll = throttledCheck()
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [throttledCheck, checkVisibleHeadings])

  const scrollToHeading = (id: string): void => {
    const element = document.getElementById(id)
    if (element) {
      // Update active ID immediately for better UX
      setActiveId(id)

      // Smooth scroll to the element
      const offset = 100 // Adjust this value based on your layout
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const renderHeading = ({ id, text, level }: { id: string; text: string; level: number }) => {
    const isActive = activeId === id
    const indentLevel = level - 1

    return (
      <motion.div
        key={id}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0.7,
          x: 0
        }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut'
        }}
        style={{
          paddingLeft: `${indentLevel * 1.5}rem`
        }}
        className="relative"
      >
        {isActive && (
          <motion.div
            layoutId="activeHeading"
            className="absolute left-0 w-0.5 h-full bg-light-text dark:bg-dark-text rounded-full -ml-2"
            transition={{
              duration: 0.2,
              ease: 'easeInOut'
            }}
          />
        )}
        <button
          type="button"
          onClick={() => scrollToHeading(id)}
          className={`w-full text-left py-1.5 text-sm transition-colors relative ${isActive
            ? 'text-light-text dark:text-dark-text'
            : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
            }`}
        >
          {text}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-10 pl-4"
    >
      <h2 className="mb-4 text-xl font-medium text-light-text dark:text-dark-text">
        Table of Contents
      </h2>
      <div className="space-y-1">
        <AnimatePresence mode="wait">
          {headings.map((heading) => renderHeading(heading))}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
} 
