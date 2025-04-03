'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-light-secondary dark:bg-dark-secondary" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-6xl">
            Welcome to My Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-light-muted dark:text-dark-muted">
            A place where I share my thoughts, experiences, and knowledge about technology, programming, and life.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blog"
              className="rounded-md bg-light-highlight dark:bg-dark-highlight px-6 py-3 text-sm font-semibold text-light-primary dark:text-dark-primary shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-highlight dark:focus-visible:outline-dark-highlight"
            >
              Read Blog Posts
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-light-text dark:text-dark-text hover:text-light-highlight dark:hover:text-dark-highlight"
            >
              Learn More <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
