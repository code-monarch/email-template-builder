"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useThemePersistence(storageKey = "theme") {
  const { theme, setTheme } = useTheme()

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey)
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [storageKey, setTheme])

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (theme) {
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, storageKey])

  return { theme, setTheme }
}
