'use client'

import { motion } from 'framer-motion'
import { MDXRemote } from 'next-mdx-remote'
import { BlogPost as BlogPostType } from '@/types/blog'
import Link from 'next/link'
import TableOfContents from '../TableOfContents/TableOfContents'
import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
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
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[250px_1fr]">
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
            className="prose prose-lg w-full dark:prose-invert prose-headings:font-mono prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base"
          >
            <header className="mb-8">
              <div className="flex items-center gap-x-4 text-sm">
                <time dateTime={post.date} className="text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="relative z-10 rounded-full bg-gray-800 px-3 py-1.5 font-medium text-gray-100">
                  {post.readingTime}
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                {post.excerpt}
              </p>
            </header>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0D0D0D] px-6 text-sm text-gray-400">
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
                className="text-sm font-semibold leading-6 text-gray-400 hover:text-white transition-colors"
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