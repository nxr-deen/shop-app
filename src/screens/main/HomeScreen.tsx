"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, RefreshControl } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "../../contexts/ThemeContext"
import { useNavigation } from "@react-navigation/native"
import { fetchFeaturedProducts, fetchNewArrivals, fetchBestSellers } from "../../store/slices/productsSlice"
import { fetchCategories } from "../../store/slices/categoriesSlice"
import type { RootState, AppDispatch } from "../../store"
import { Search, Bell } from "react-native-feather"

export default function HomeScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()

  const featuredProducts = useSelector((state: RootState) => state.products.featuredItems)
  const newArrivals = useSelector((state: RootState) => state.products.newArrivals)
  const bestSellers = useSelector((state: RootState) => state.products.bestSellers)
  const categories = useSelector((state: RootState) => state.categories.items)
  const loading = useSelector((state: RootState) => state.products.loading)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    dispatch(fetchFeaturedProducts())
    dispatch(fetchNewArrivals())
    dispatch(fetchBestSellers())
    dispatch(fetchCategories())
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.productPrice, { color: theme.colors.primary }]}>${item.price.toFixed(2)}</Text>
          {item.discountPrice && (
            <Text style={[styles.discountPrice, { color: theme.colors.muted }]}>${item.discountPrice.toFixed(2)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("Category", { categoryId: item.id, name: item.name })}
    >
      <View style={[styles.categoryImageContainer, { backgroundColor: theme.colors.card }]}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </View>
      <Text style={[styles.categoryName, { color: theme.colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.greeting, { color: theme.colors.text }]}>Hello, User</Text>
          <Text style={[styles.welcomeText, { color: theme.colors.primary }]}>Welcome to ShopApp</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.colors.background }]}
            onPress={() => navigation.navigate("SearchResults")}
          >
            <Search width={20} height={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.colors.background }]}>
            <Bell width={20} height={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
      >
        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ExploreStack")}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* New Arrivals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>New Arrivals</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={newArrivals}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Best Sellers</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={bestSellers}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    marginRight: 15,
    width: 80,
    alignItems: "center",
  },
  categoryImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
  },
  productsList: {
    paddingRight: 20,
  },
  productCard: {
    width: 150,
    borderRadius: 10,
    marginRight: 15,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  discountPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
})
