'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlogPost as BlogPostType } from '@/lib/mdx'
import Image from 'next/image'
import { useState } from 'react'

interface BlogListProps {
  posts: BlogPostType[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5

  // First, sort all posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = sortedPosts.slice(startIndex, endIndex)
  
  // Group current posts by year
  const groupedPosts = currentPosts.reduce((groups, post) => {
    const year = new Date(post.date).getFullYear()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
    return groups
  }, {} as Record<number, BlogPostType[]>)

  // Sort years in descending order
  const years = Object.keys(groupedPosts)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="max-w-3xl mx-auto">
      {years.map((year) => (
        <div key={year} className="mb-16">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">
            {year}
          </h2>
          <div className="space-y-12">
            {groupedPosts[year].map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="grid grid-cols-[1fr_auto] gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-light-text dark:text-dark-text group-hover:text-light-highlight dark:group-hover:text-dark-highlight transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-light-muted dark:text-dark-muted line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-light-muted dark:text-dark-muted">
                        <span>@enscribe</span>
                        <span>•</span>
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-sm px-3 py-1 rounded-full bg-light-accent/20 dark:bg-dark-accent/20 text-light-text dark:text-dark-text"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-light-accent/20 dark:bg-dark-accent/20 text-light-text dark:text-dark-text'
                  : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 
