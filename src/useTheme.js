import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'connector.theme'

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export default function useTheme() {
  // Начальное значение сверяется с <html> — класс уже мог поставить inline-скрипт
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : readTheme(),
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* приватный режим — тема просто не сохранится */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return [theme, toggle]
}
