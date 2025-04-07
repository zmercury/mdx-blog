import { NavigationItem } from '@/types/layout'

export const SITE_NAME = "Mercury's Blog"
export const SITE_DESCRIPTION = 'A modern blog built with Next.js, MDX, and Tailwind CSS.'

export const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
]

export const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com' },
  { name: 'GitHub', href: 'https://github.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
] 
