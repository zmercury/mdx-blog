'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-light-primary/10 via-light-secondary to-light-primary/5 dark:from-dark-primary/10 dark:via-dark-secondary dark:to-dark-primary/5">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary/10),theme(colors.background))]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8"
      >
        <div className="text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-light-text dark:text-dark-text sm:text-6xl md:text-7xl"
          >
            Welcome to My Blog
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto"
          >
            Discover insightful articles, tutorials, and thoughts on technology, coding, and innovation.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/posts"
              className="group inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
            >
              Explore Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary"
            >
              Learn more about us
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
