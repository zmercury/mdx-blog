'use client'

import { motion } from 'framer-motion'
import { MDXRemote } from 'next-mdx-remote'
import { BlogPost as BlogPostType } from '@/lib/mdx'
import Link from 'next/link'
import TableOfContents from './TableOfContents'
import { useEffect, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])

  useEffect(() => {
    Prism.highlightAll()
  }, [post.mdxSource])

  useEffect(() => {
    // Extract headings from the MDX content
    const headingElements = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4')
    console.log('Found headings:', headingElements.length)
    
    const extractedHeadings = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName[1]),
    }))
    
    console.log('Extracted headings:', extractedHeadings)
    setHeadings(extractedHeadings)
  }, [post.mdxSource])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_250px]">
        <div className="w-full">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg mx-auto w-full dark:prose-invert"
          >
            <header className="mb-8">
              <div className="flex items-center gap-x-4 text-sm">
                <time dateTime={post.date} className="text-light-muted dark:text-dark-muted">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="relative z-10 rounded-full bg-light-accent dark:bg-dark-accent px-3 py-1.5 font-medium text-light-text dark:text-dark-text">
                  {post.readingTime}
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-light-muted dark:text-dark-muted">
                {post.excerpt}
              </p>
            </header>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-light-accent dark:border-dark-accent" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-light-primary dark:bg-dark-primary px-6 text-sm text-light-muted dark:text-dark-muted">
                  Article
                </span>
              </div>
            </div>

            <div className="mt-8">
              <MDXRemote {...post.mdxSource} />
            </div>

            <div className="mt-16 flex items-center justify-center">
              <Link
                href="/blog"
                className="text-sm font-semibold leading-6 text-light-text hover:text-light-highlight dark:text-dark-text dark:hover:text-dark-highlight"
              >
                ← Back to all posts
              </Link>
            </div>
          </motion.article>
        </div>

        {headings.length > 0 && (
          <div className="hidden lg:block">
            <TableOfContents headings={headings} />
          </div>
        )}
      </div>
    </div>
  )
} 