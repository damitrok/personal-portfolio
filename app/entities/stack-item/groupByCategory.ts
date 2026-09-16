import type { StackItem } from './model'

/** Stable, sensible rendering order for stack categories. */
export const STACK_CATEGORY_ORDER: StackItem['category'][] = [
  'languages',
  'frameworks',
  'tooling',
  'testing'
]

/** Groups stack items by category, preserving the order in {@link STACK_CATEGORY_ORDER}. */
export function groupByCategory(items: StackItem[]): Record<StackItem['category'], StackItem[]> {
  const groups = STACK_CATEGORY_ORDER.reduce(
    (acc, category) => {
      acc[category] = []
      return acc
    },
    {} as Record<StackItem['category'], StackItem[]>
  )

  for (const item of items) {
    groups[item.category].push(item)
  }

  return groups
}
