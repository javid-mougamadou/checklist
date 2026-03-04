import { useLayoutEffect } from 'react'
import { usePersistentState } from './usePersistentState'
import type { Theme } from '../constants/theme'

const THEME_STORAGE_KEY = 'checklist.theme-v1'

const DAISY_THEMES: Record<Theme, string> = {
  light: 'light',
  dark: 'dark',
}

/** Lit le thème déjà appliqué par le script inline (pas de "dark" en dur). */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const fromDom = document.documentElement.getAttribute('data-theme')
  if (fromDom === 'light' || fromDom === 'dark') return fromDom
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (raw && String(raw).trim().toLowerCase() === 'light') return 'light'
    if (raw && String(raw).trim().toLowerCase() === 'dark') return 'dark'
  } catch {
    // ignore
  }
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = usePersistentState<Theme>({
    key: THEME_STORAGE_KEY,
    defaultValue: getInitialTheme(),
    serialize: (v) => v,
    deserialize: (v) =>
      v && String(v).trim().toLowerCase() === 'light' ? 'light' : 'dark',
  })

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', DAISY_THEMES[theme])
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
