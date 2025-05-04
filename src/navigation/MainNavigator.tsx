"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import HomeStack from "./stacks/HomeStack"
import ExploreStack from "./stacks/ExploreStack"
import CartStack from "./stacks/CartStack"
import ProfileStack from "./stacks/ProfileStack"
import { useTheme } from "../contexts/ThemeContext"
import { useCart } from "../contexts/CartContext"

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
  const { theme } = useTheme()
  const { cartItems } = useCart()

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "ExploreStack") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "CartStack") {
            iconName = focused ? "cart" : "cart-outline"
          } else if (route.name === "ProfileStack") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="ExploreStack" component={ExploreStack} options={{ tabBarLabel: "Explore" }} />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarLabel: "Cart",
          tabBarBadge: cartItemCount > 0 ? cartItemCount : null,
        }}
      />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ tabBarLabel: "Profile" }} />
    </Tab.Navigator>
  )
}
