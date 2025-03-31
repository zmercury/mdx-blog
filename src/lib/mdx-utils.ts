import { Heading } from '@/types/blog'

export const getParentId = (id: string, headings: Heading[]): string | null => {
  const heading = headings.find((h) => h.id === id)
  if (!heading) return null

  const currentLevel = heading.level
  const currentIndex = headings.findIndex((h) => h.id === id)

  for (let i = currentIndex - 1; i >= 0; i--) {
    if (headings[i].level < currentLevel) {
      return headings[i].id
    }
  }

  return null
}

export const buildHeadingTree = (items: Heading[]): HeadingNode[] => {
  const tree: HeadingNode[] = []
  const stack: HeadingNode[] = []

  items.forEach((item) => {
    const node: HeadingNode = {
      ...item,
      children: [],
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      tree.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }

    stack.push(node)
  })

  return tree
} 