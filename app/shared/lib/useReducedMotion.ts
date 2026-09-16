import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Tracks `prefers-reduced-motion`, live-updating if the user changes it mid-session. */
export function useReducedMotion() {
  const prefersReducedMotion = ref(false)

  let mediaQuery: MediaQueryList | undefined
  const handleChange = (event: MediaQueryListEvent) => {
    prefersReducedMotion.value = event.matches
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = mediaQuery.matches
    mediaQuery.addEventListener('change', handleChange)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', handleChange)
  })

  return { prefersReducedMotion }
}
