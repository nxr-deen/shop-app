"use client"

import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../contexts/AuthContext"
import AuthNavigator from "./AuthNavigator"
import MainNavigator from "./MainNavigator"
import SplashScreen from "../screens/SplashScreen"
import OnboardingScreen from "../screens/OnboardingScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth()
  const [isFirstLaunch, setIsFirstLaunch] = React.useState<boolean | null>(null)

  useEffect(() => {
    AsyncStorage.getItem("hasLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("hasLaunched", "true")
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if (isLoading || isFirstLaunch === null) {
    return <SplashScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}
