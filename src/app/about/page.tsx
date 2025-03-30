import { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about me and my journey in technology and programming.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AboutContent />
    </div>
  )
} 