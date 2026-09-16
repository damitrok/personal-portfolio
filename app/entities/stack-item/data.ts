import type { StackItem } from './model'

// Placeholder proficiency levels — the user will tune these later.
export const stackItems: StackItem[] = [
  { name: 'TypeScript', category: 'languages', level: 'advanced' },
  { name: 'JavaScript', category: 'languages', level: 'advanced' },
  { name: 'SCSS / CSS', category: 'languages', level: 'confident' },
  { name: 'HTML', category: 'languages', level: 'advanced' },
  { name: 'Vue 3', category: 'frameworks', level: 'advanced' },
  { name: 'Nuxt 4', category: 'frameworks', level: 'confident' },
  { name: 'Three.js / TresJS', category: 'frameworks', level: 'familiar' },
  { name: 'GSAP', category: 'tooling', level: 'familiar' },
  { name: 'Vite', category: 'tooling', level: 'confident' },
  { name: 'ESLint', category: 'tooling', level: 'confident' },
  { name: 'Git', category: 'tooling', level: 'confident' },
  { name: 'Vitest', category: 'testing', level: 'confident' },
  { name: 'Vue Test Utils', category: 'testing', level: 'familiar' }
]
