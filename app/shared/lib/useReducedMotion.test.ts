import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useReducedMotion } from './useReducedMotion'

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const mql = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: (event: MediaQueryListEvent) => void) => listeners.delete(cb)
  }
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(mql))
  return {
    emitChange: (next: boolean) => {
      listeners.forEach((cb) => cb({ matches: next } as MediaQueryListEvent))
    }
  }
}

const Harness = defineComponent({
  setup() {
    const { prefersReducedMotion } = useReducedMotion()
    return () => h('div', prefersReducedMotion.value ? 'reduced' : 'full')
  }
})

describe('useReducedMotion', () => {
  it('reflects the initial media query state', async () => {
    mockMatchMedia(true)
    const wrapper = mount(Harness)
    await nextTick()
    expect(wrapper.text()).toBe('reduced')
  })

  it('updates when the media query changes', async () => {
    const { emitChange } = mockMatchMedia(false)
    const wrapper = mount(Harness)
    await nextTick()
    expect(wrapper.text()).toBe('full')

    emitChange(true)
    await nextTick()
    expect(wrapper.text()).toBe('reduced')
  })
})
