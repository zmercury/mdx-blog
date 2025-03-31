import { useState, useEffect } from 'react'
import { Heading } from '@/types/blog'

export function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the MDX content
    const headingElements = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4')
    
    const extractedHeadings = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))
    
    setHeadings(extractedHeadings)

    // Set up intersection observer for active heading
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

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return { headings, activeId }
} 