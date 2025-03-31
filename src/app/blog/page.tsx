import { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import BlogList from '@/components/blog/BlogList'

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Read my latest blog posts about technology, programming, and life.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogList posts={posts} />
    </div>
  )
} 
