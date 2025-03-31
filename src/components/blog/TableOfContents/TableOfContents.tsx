'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { TableOfContentsProps, HeadingNode } from '@/types/blog'
import { buildHeadingTree, getParentId } from '@/lib/mdx-utils'

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  // Initialize all sections as expanded when headings change
  useEffect(() => {
    const allIds = headings.map(heading => heading.id)
    setExpandedSections(new Set(allIds))
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

  const renderTree = (nodes: HeadingNode[], level = 0) => {
    return nodes.map((node) => {
      const hasChildren = node.children.length > 0
      const isExpanded = expandedSections.has(node.id)

      return (
        <div key={node.id} style={{ marginLeft: `${level * 1}rem` }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="group flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors text-light-muted hover:bg-light-accent/5 hover:text-light-accent dark:text-dark-muted dark:hover:bg-dark-accent/5 dark:hover:text-dark-accent"
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

  const tree = buildHeadingTree(headings)

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