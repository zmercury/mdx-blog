'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface TableOfContentsProps {
  headings: Array<{
    id: string
    text: string
    level: number
  }>
}

interface HeadingNode {
  id: string
  text: string
  level: number
  children: HeadingNode[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            // Expand the section when it becomes active
            const parentId = getParentId(entry.target.id)
            if (parentId) {
              setExpandedSections((prev) => new Set([...prev, parentId]))
            }
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

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const getParentId = (id: string): string | null => {
    const heading = headings.find((h) => h.id === id)
    if (!heading) return null

    const currentLevel = heading.level
    const currentIndex = headings.findIndex((h) => h.id === id)

    for (let i = currentIndex - 1; i >= 0; i--) {
      if (headings[i].level < currentLevel) {
        return headings[i].id
      }
    }

    return null
  }

  const buildTree = (items: typeof headings): HeadingNode[] => {
    const tree: HeadingNode[] = []
    const stack: HeadingNode[] = []

    items.forEach((item) => {
      const node: HeadingNode = {
        ...item,
        children: [],
      }

      while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
        stack.pop()
      }

      if (stack.length === 0) {
        tree.push(node)
      } else {
        stack[stack.length - 1].children.push(node)
      }

      stack.push(node)
    })

    return tree
  }

  const renderTree = (nodes: HeadingNode[], level = 0) => {
    return nodes.map((node) => {
      const hasChildren = node.children.length > 0
      const isExpanded = expandedSections.has(node.id)
      const isActive = activeId === node.id

      return (
        <div key={node.id} style={{ marginLeft: `${level * 1}rem` }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`group flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors ${
              isActive
                ? 'bg-light-accent/10 text-light-accent dark:bg-dark-accent/10 dark:text-dark-accent'
                : 'text-light-muted hover:bg-light-accent/5 hover:text-light-accent dark:text-dark-muted dark:hover:bg-dark-accent/5 dark:hover:text-dark-accent'
            }`}
          >
            {hasChildren && (
              <button
                onClick={() => toggleSection(node.id)}
                className="flex items-center justify-center p-0.5 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded"
              >
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="down"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="right"
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
            <button
              onClick={() => scrollToHeading(node.id)}
              className="flex-1 text-left hover:underline"
            >
              {node.text}
            </button>
          </motion.div>
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {renderTree(node.children, level + 1)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    })
  }

  const tree = buildTree(headings)

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg border border-light-accent/5 bg-light-accent/5 p-6 shadow-sm dark:border-dark-accent/5 dark:bg-dark-accent/5"
    >
      <h2 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
        Table of Contents
      </h2>
      <div className="space-y-1">{renderTree(tree)}</div>
    </motion.nav>
  )
} 