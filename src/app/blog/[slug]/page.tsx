import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/mdx'
import BlogPost from '@/components/blog/BlogPost'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPost post={post} />
    </div>
  )
} 