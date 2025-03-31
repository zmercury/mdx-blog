import { useState, useEffect } from 'react'
import { Heading } from '@/types/blog'

export function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the MDX content
    const headingElements = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4')
    
    const extractedHeadings = Array.from(headingElements).map((heading) => ({
      id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))

    // Filter out any empty headings and ensure proper hierarchy
    const validHeadings = extractedHeadings.filter(heading => 
      heading.id && 
      heading.text && 
      heading.level >= 1 && 
      heading.level <= 4
    )

    setHeadings(validHeadings)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        // Get all intersecting entries
        const intersectingEntries = entries.filter(entry => entry.isIntersecting)
        
        // If we have intersecting entries, use the first one
        if (intersectingEntries.length > 0) {
          setActiveId(intersectingEntries[0].target.id)
        }
      },
      { 
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0.5 // Trigger when element is 50% visible
      }
    )

    validHeadings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return { headings, activeId }
} 