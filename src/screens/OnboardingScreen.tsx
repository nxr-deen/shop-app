"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../contexts/ThemeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { width } = Dimensions.get("window")

const slides = [
  {
    id: "1",
    title: "Welcome to ShopApp",
    description: "Discover thousands of products from top brands all in one place.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: "2",
    title: "Easy Shopping",
    description: "Browse, search, and filter products to find exactly what you need.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: "3",
    title: "Secure Checkout",
    description: "Multiple payment options and secure checkout process.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: "4",
    title: "Fast Delivery",
    description: "Get your products delivered to your doorstep quickly and safely.",
    image: "https://via.placeholder.com/300",
  },
]

export default function OnboardingScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>{item.description}</Text>
      </View>
    )
  }

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
    } else {
      handleFinish()
    }
  }

  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem("hasLaunched", "true")
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      })
    } catch (error) {
      console.error("Error saving onboarding status:", error)
    }
  }

  const handleSkip = () => {
    handleFinish()
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: index === currentIndex ? theme.colors.primary : theme.colors.border,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={[styles.skipButtonText, { color: theme.colors.muted }]}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.nextButtonText}>{currentIndex === slides.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  skipButton: {
    padding: 15,
  },
  skipButtonText: {
    fontSize: 16,
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
