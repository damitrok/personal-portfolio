import { describe, expect, it } from 'vitest'
import { useCodeViewer } from './useCodeViewer'

describe('useCodeViewer', () => {
  it('starts closed with no active snippet', () => {
    const { isOpen, activeSnippet } = useCodeViewer()
    expect(isOpen.value).toBe(false)
    expect(activeSnippet.value).toBeNull()
  })

  it('open() sets the active snippet and opens the panel', () => {
    const { isOpen, activeSnippet, open } = useCodeViewer()
    open({ title: 'Example.vue', source: '<template />', lang: 'vue' })

    expect(isOpen.value).toBe(true)
    expect(activeSnippet.value).toEqual({ title: 'Example.vue', source: '<template />', lang: 'vue' })
  })

  it('close() hides the panel without clearing the snippet, so the closing transition still has content', () => {
    const { isOpen, activeSnippet, open, close } = useCodeViewer()
    open({ title: 'Example.vue', source: '<template />', lang: 'vue' })
    close()

    expect(isOpen.value).toBe(false)
    expect(activeSnippet.value).not.toBeNull()
  })

  it('opening a second snippet replaces the first', () => {
    const { activeSnippet, open } = useCodeViewer()
    open({ title: 'First.vue', source: 'a', lang: 'vue' })
    open({ title: 'Second.ts', source: 'b', lang: 'typescript' })

    expect(activeSnippet.value?.title).toBe('Second.ts')
  })
})
