'use client'

import { motion } from 'framer-motion'
import { MDXRemote } from 'next-mdx-remote'
import { BlogPost as BlogPostType } from '@/types/blog'
import TableOfContents from '../TableOfContents/TableOfContents'
import { useEffect } from 'react'
import Prism from 'prismjs'
import '@/styles/prism-theme.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import { useHeadings } from '@/hooks/useHeadings'
import Image from 'next/image'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const { headings } = useHeadings()

  useEffect(() => {
    Prism.highlightAll()
  }, [post.mdxSource])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full width image and header section */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        {/* Featured Image Container */}
        <div className="relative h-[40vh] w-full overflow-hidden">
          {/* Image */}
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center rounded-md"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-light-primary/90 dark:to-dark-primary/90" />
        </div>

        {/* Centered Header Content */}
        <header className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center justify-center gap-x-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-light-text dark:text-dark-text">@mercury</span>
              <span className="text-light-muted dark:text-dark-muted">•</span>
              <time dateTime={post.date} className="text-light-muted dark:text-dark-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-light-muted dark:text-dark-muted">•</span>
              <span className="text-light-muted dark:text-dark-muted">
                {post.readingTime}
              </span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-light-accent/20 dark:bg-dark-accent/20 px-3 py-1 text-sm font-medium text-light-text dark:text-dark-text"
                >
                  {"#" + tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </div>

      {/* Content grid with table of contents */}
      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] mt-12">
        {headings.length > 0 && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </div>
        )}
        <div className="w-full prose prose-lg dark:prose-invert prose-headings:scroll-mt-32 
          prose-pre:bg-light-accent/10 dark:prose-pre:bg-dark-accent/10
          prose-code:text-light-text prose-code:dark:text-dark-text
          prose-code:before:content-none prose-code:after:content-none"
        >
          <MDXRemote {...post.mdxSource} />
        </div>
      </div>
    </motion.article>
  )
} 
