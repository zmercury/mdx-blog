'use client'

import { MainLayoutProps } from '@/types/layout'
import { ThemeProvider } from 'next-themes'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Breadcrumbs from './Breadcrumbs'

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-light-primary dark:bg-dark-primary">
        <Header />
        <main className="flex-grow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs />
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
} 
