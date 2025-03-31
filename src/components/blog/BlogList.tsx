'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlogPost as BlogPostType } from '@/lib/mdx'
import Image from 'next/image'

interface BlogListProps {
  posts: BlogPostType[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-16 text-center">
        Blog Posts
      </h1>
      <div className="grid gap-12 lg:grid-cols-2">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-light-secondary dark:bg-dark-secondary rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-64 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-4">
                  <time dateTime={post.date} className="text-sm text-light-muted dark:text-dark-muted">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-sm px-3 py-1 rounded-full bg-light-accent/30 dark:bg-dark-accent/30 text-light-text dark:text-dark-text">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4 group-hover:text-light-highlight dark:group-hover:text-dark-highlight transition-colors">
                  {post.title}
                </h2>
                <p className="text-light-muted dark:text-dark-muted line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center text-light-text dark:text-dark-text group-hover:text-light-highlight dark:group-hover:text-dark-highlight transition-colors">
                  Read more
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  )
} 
