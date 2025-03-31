import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: string
  image: string
  tags?: string[]
  mdxSource: MDXRemoteSerializeResult
}

export interface Heading {
  id: string
  text: string
  level: number
}

export interface HeadingNode extends Heading {
  children: HeadingNode[]
}

export interface TableOfContentsProps {
  headings: Heading[]
} 