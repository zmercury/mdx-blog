'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TableOfContentsProps } from '@/types/blog'

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderHeading = (heading: { id: string; text: string; level: number }) => {
    const isActive = activeId === heading.id
    const indentLevel = heading.level - 1 // h1 starts at level 1

    return (
      <motion.button
        key={heading.id}
        onClick={() => scrollToHeading(heading.id)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`w-full text-left  ${isActive ? 'text-white' : 'text-gray-500'
          }`}
        style={{
          paddingLeft: `${indentLevel * 2}rem`,
          fontSize: '0.9rem',
          lineHeight: '1.75',
        }}
      >
        {heading.text}
      </motion.button>
    )
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-8"
    >
      <h2 className="mb-6 text-xl  text-white">Table of Contents</h2>
      <div className="space-y-1">
        {headings.map((heading) => renderHeading(heading))}
      </div>
    </motion.nav>
  )
} 
