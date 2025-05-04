"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { lightTheme, darkTheme, type Theme } from "../theme"

type ThemeContextType = {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (mode: "light" | "dark" | "system") => void
  themeMode: "light" | "dark" | "system"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">("system")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorScheme === "dark")

  useEffect(() => {
    // Load saved theme preference
    const loadThemePreference = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem("themeMode")
        if (savedThemeMode) {
          setThemeMode(savedThemeMode as "light" | "dark" | "system")
          if (savedThemeMode === "light") {
            setIsDarkMode(false)
          } else if (savedThemeMode === "dark") {
            setIsDarkMode(true)
          } else {
            setIsDarkMode(colorScheme === "dark")
          }
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error)
      }
    }

    loadThemePreference()
  }, [colorScheme])

  // Update theme when system preference changes
  useEffect(() => {
    if (themeMode === "system") {
      setIsDarkMode(colorScheme === "dark")
    }
  }, [colorScheme, themeMode])

  const toggleTheme = () => {
    const newMode = isDarkMode ? "light" : "dark"
    setThemeMode(newMode)
    setIsDarkMode(!isDarkMode)
    AsyncStorage.setItem("themeMode", newMode)
  }

  const setTheme = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode)
    if (mode === "light") {
      setIsDarkMode(false)
    } else if (mode === "dark") {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(colorScheme === "dark")
    }
    AsyncStorage.setItem("themeMode", mode)
  }

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, setTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
