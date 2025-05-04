"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/api"
import type { User } from "../types"

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken")
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
          const response = await api.get("/user/profile")
          setUser(response.data)
        }
      } catch (error) {
        console.error("Failed to load user:", error)
        await AsyncStorage.removeItem("authToken")
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      await AsyncStorage.setItem("authToken", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/register", { name, email, password })
      const { token, user } = response.data

      await AsyncStorage.setItem("authToken", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await api.post("/auth/logout")
      await AsyncStorage.removeItem("authToken")
      delete api.defaults.headers.common["Authorization"]
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await api.post("/auth/forgot-password", { email })
    } catch (error) {
      console.error("Forgot password request failed:", error)
      throw error
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true)
      const response = await api.put("/user/profile", userData)
      setUser(response.data)
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
