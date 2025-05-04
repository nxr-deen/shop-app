"use client"

import { useState, useEffect, useRef } from "react"
import { Text, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { X } from "react-native-feather"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  message?: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

// Create a global event emitter for showing toasts
export const toastEventEmitter = {
  listeners: new Set<(props: ToastProps) => void>(),

  addListener(listener: (props: ToastProps) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  },

  emit(props: ToastProps) {
    this.listeners.forEach((listener) => listener(props))
  },
}

// Helper functions to show different types of toasts
export const showToast = (message: string, type: ToastType = "info", duration = 3000) => {
  toastEventEmitter.emit({ message, type, duration })
}

export const showSuccessToast = (message: string, duration = 3000) => {
  showToast(message, "success", duration)
}

export const showErrorToast = (message: string, duration = 3000) => {
  showToast(message, "error", duration)
}

export const showInfoToast = (message: string, duration = 3000) => {
  showToast(message, "info", duration)
}

export const showWarningToast = (message: string, duration = 3000) => {
  showToast(message, "warning", duration)
}

export function Toast() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<ToastType>("info")
  const [duration, setDuration] = useState(3000)

  const translateY = useRef(new Animated.Value(-100)).current
  const opacity = useRef(new Animated.Value(0)).current
  const timeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const unsubscribe = toastEventEmitter.addListener(({ message, type = "info", duration = 3000 }) => {
      setMessage(message || "")
      setType(type)
      setDuration(duration)
      setVisible(true)

      // Clear any existing timeout
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      // Animate in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Set timeout to hide toast
      timeout.current = setTimeout(() => {
        hideToast()
      }, duration)
    })

    return () => {
      unsubscribe()
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false)
    })
  }

  if (!visible) return null

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return theme.colors.success
      case "error":
        return theme.colors.error
      case "warning":
        return theme.colors.warning
      case "info":
      default:
        return theme.colors.info
    }
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
        <X width={16} height={16} color="white" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  message: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
  },
})
