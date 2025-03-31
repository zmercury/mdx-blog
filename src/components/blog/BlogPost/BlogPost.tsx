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
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
      {headings.length > 0 && (
        <div className="hidden lg:block sticky top-8">
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
          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <header className="mb-8">
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-x-4 text-sm">
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
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-light-accent/20 dark:bg-dark-accent/20 px-3 py-1 text-sm font-medium text-light-text dark:text-dark-text"
                  >
                    {"#"+ tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="mt-8">
            <MDXRemote {...post.mdxSource} />
          </div>
        </motion.article>
      </div>
    </div>
  )
} 
