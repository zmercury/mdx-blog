'use client'

import { motion } from 'framer-motion'
import { MDXRemote } from 'next-mdx-remote'
import { BlogPost as BlogPostType } from '@/types/blog'
import Link from 'next/link'
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

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const { headings } = useHeadings()

  useEffect(() => {
    Prism.highlightAll()
  }, [post.mdxSource])

  return (
    <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
        {headings.length > 0 && (
          <div className="hidden lg:block">
            <TableOfContents headings={headings} />
          </div>
        )}
        <div className="w-full">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg w-full dark:prose-invert prose-headings:scroll-mt-32 
              prose-pre:bg-light-accent/10 dark:prose-pre:bg-dark-accent/10
              prose-code:text-light-text prose-code:dark:text-dark-text
              prose-code:before:content-none prose-code:after:content-none"
          >
            <header className="mb-8">
              <div className="flex items-center gap-x-4 text-sm">
                <time dateTime={post.date} className="text-light-text dark:text-dark-text">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="relative z-10 rounded-full bg-light-accent/30 dark:bg-dark-accent/30 px-3 py-1.5 font-medium text-light-text dark:text-dark-text">
                  {post.readingTime}
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-light-text dark:text-dark-text">
                {post.excerpt}
              </p>
            </header>

            <div className="mt-8">
              <MDXRemote {...post.mdxSource} />
            </div>

            <div className="mt-16 flex items-center justify-center">
              <Link
                href="/blog"
                className="text-sm font-semibold leading-6 text-light-text dark:text-dark-text hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
              >
                ← Back to all posts
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  )
} 
