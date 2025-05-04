"use client"

import React, { useEffect } from "react"
import { View, Text, StyleSheet, Animated, Easing } from "react-native"
import { useTheme } from "../contexts/ThemeContext"

export default function SplashScreen() {
  const { theme } = useTheme()
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current
  const opacityAnim = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [scaleAnim, opacityAnim])

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Text style={[styles.logo, { color: theme.colors.primary }]}>ShopApp</Text>
        <Text style={[styles.tagline, { color: theme.colors.text }]}>Your one-stop shopping destination</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    opacity: 0.8,
  },
})
