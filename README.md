# Modern Blog Platform

A modern, minimalist blog platform built with Next.js, MDX, and Tailwind CSS. Features a beautiful design with both light and dark modes, syntax highlighting, and a dynamic table of contents.

## ✨ Features

- **Modern Stack**: Built with Next.js, TypeScript, and Tailwind CSS
- **Content Management**: Write blog posts in MDX format
- **Beautiful Design**:
  - Clean, minimalist interface
  - Custom color scheme
  - Responsive layout
  - Smooth animations with Framer Motion
- **Dark/Light Mode**: Elegant theme switching with custom color palettes
- **Developer Experience**:
  - Syntax highlighting for code blocks
  - Table of contents for easy navigation
  - Reading time estimation
  - Category tags

## 🎨 Color Palette

### Light Mode

- Primary: `#FDFCDC` (Cream)
- Secondary: `#F5F4D9`
- Accent: `#1A535C`
- Highlight: `#4ECDC4`

### Dark Mode

- Primary: `#1A1A1A`
- Secondary: `#2D2D2D`
- Accent: `#4ECDC4`
- Highlight: `#FF6B6B`

### UI Elements

- Teal: `#1A535C`
- Cyan: `#4ECDC4`
- Coral: `#FF6B6B`
- Purple: `#6a4c93`
- Orange: `#ee964b`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog.git
cd blog
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Creating Blog Posts

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter with the following fields:

```yaml
---
title: 'Your Blog Title'
date: '2024-03-31'
excerpt: 'A brief description of your blog post'
readingTime: '5 min read'
image: 'path/to/your/image.jpg'
---
```

3. Write your content using MDX

### Code Block Example

```typescript
// Your code here
const example = "This will be syntax highlighted"
```

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Content management
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Prism.js](https://prismjs.com/) - Syntax highlighting

## 🔧 Customization

### Theme

Modify the color scheme in `tailwind.config.mjs`:

```typescript
colors: {
  dark: {
    primary: '#1A1A1A',
    // ...
  },
  light: {
    primary: '#FDFCDC',
    // ...
  }
}
```

### Typography

Customize typography settings in the same config file under the `typography` section.
