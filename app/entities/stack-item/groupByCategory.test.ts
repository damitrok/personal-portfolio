import { describe, expect, it } from 'vitest'
import type { StackItem } from './model'
import { groupByCategory, STACK_CATEGORY_ORDER } from './groupByCategory'

const items: StackItem[] = [
  { name: 'TypeScript', category: 'languages', level: 'advanced' },
  { name: 'Vue 3', category: 'frameworks', level: 'advanced' },
  { name: 'Vite', category: 'tooling', level: 'confident' },
  { name: 'JavaScript', category: 'languages', level: 'advanced' },
  { name: 'Vitest', category: 'testing', level: 'confident' }
]

describe('groupByCategory', () => {
  it('groups items under their category key', () => {
    const groups = groupByCategory(items)

    expect(groups.languages).toEqual([
      { name: 'TypeScript', category: 'languages', level: 'advanced' },
      { name: 'JavaScript', category: 'languages', level: 'advanced' }
    ])
    expect(groups.frameworks).toEqual([{ name: 'Vue 3', category: 'frameworks', level: 'advanced' }])
    expect(groups.tooling).toEqual([{ name: 'Vite', category: 'tooling', level: 'confident' }])
    expect(groups.testing).toEqual([{ name: 'Vitest', category: 'testing', level: 'confident' }])
  })

  it('includes every category even when no items belong to it', () => {
    const groups = groupByCategory([])

    for (const category of STACK_CATEGORY_ORDER) {
      expect(groups[category]).toEqual([])
    }
  })

  it('returns category keys in the stable, sensible order', () => {
    const groups = groupByCategory(items)

    expect(Object.keys(groups)).toEqual(STACK_CATEGORY_ORDER)
  })

  it('does not mutate the input array', () => {
    const original = [...items]
    groupByCategory(items)

    expect(items).toEqual(original)
  })
})
