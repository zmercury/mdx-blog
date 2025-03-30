'use client'

import { motion } from 'framer-motion'

export default function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-lg mx-auto max-w-3xl dark:prose-invert"
    >
      <h1 className="mb-8 text-4xl font-bold text-light-text dark:text-dark-text">
        About Me
      </h1>
      <p className="text-lg leading-relaxed text-light-muted dark:text-dark-muted">
        Hello! I&apos;m a passionate software developer with a love for creating beautiful and functional web applications.
        I specialize in modern web technologies and enjoy sharing my knowledge through blog posts and tutorials.
      </p>
      <h2 className="mt-8 text-2xl font-semibold text-light-text dark:text-dark-text">
        My Journey
      </h2>
      <p className="text-lg leading-relaxed text-light-muted dark:text-dark-muted">
        I started my programming journey with a curiosity about how things work on the internet.
        Over the years, I&apos;ve worked with various technologies and frameworks, always staying up to date
        with the latest developments in the web development ecosystem.
      </p>
      <h2 className="mt-8 text-2xl font-semibold text-light-text dark:text-dark-text">
        What I Do
      </h2>
      <p className="text-lg leading-relaxed text-light-muted dark:text-dark-muted">
        I focus on building modern web applications using React, Next.js, and other cutting-edge technologies.
        I&apos;m particularly interested in creating performant, accessible, and user-friendly applications that
        make a difference in people&apos;s lives.
      </p>
      <h2 className="mt-8 text-2xl font-semibold text-light-text dark:text-dark-text">
        Get in Touch
      </h2>
      <p className="text-lg leading-relaxed text-light-muted dark:text-dark-muted">
        I&apos;m always open to new opportunities and collaborations. Feel free to reach out through my social media
        channels or email me directly.
      </p>
    </motion.div>
  )
} 