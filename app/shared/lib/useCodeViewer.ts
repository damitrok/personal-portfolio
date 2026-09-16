import { ref } from 'vue'

export interface CodeSnippet {
  title: string
  source: string
  lang: 'vue' | 'typescript' | 'scss'
}

const isOpen = ref(false)
const activeSnippet = ref<CodeSnippet | null>(null)

/** Single shared panel state — only one code snippet can be open at a
 * time, so this is a plain module-scoped singleton rather than per-
 * component state. */
export function useCodeViewer() {
  function open(snippet: CodeSnippet) {
    activeSnippet.value = snippet
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, activeSnippet, open, close }
}
