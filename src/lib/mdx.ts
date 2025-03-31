import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { BlogPost } from '@/types/blog'

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog')

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ],
  },
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(POSTS_PATH)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const filePath = path.join(POSTS_PATH, file)
        const source = fs.readFileSync(filePath, 'utf8')
        const { content, data } = matter(source)
        const mdxSource = await serialize(content, mdxOptions as any)

        return {
          slug: file.replace(/\.mdx$/, ''),
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          readingTime: data.readingTime,
          image: data.image || '',
          mdxSource,
        }
      })
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, mdxOptions as any)

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    readingTime: data.readingTime,
    image: data.image || '',
    mdxSource,
  }
} 