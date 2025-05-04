import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../../screens/main/HomeScreen"
import ProductDetailsScreen from "../../screens/main/ProductDetailsScreen"
import CategoryScreen from "../../screens/main/CategoryScreen"
import SearchResultsScreen from "../../screens/main/SearchResultsScreen"

const Stack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Product Details" }} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} options={{ title: "Search Results" }} />
    </Stack.Navigator>
  )
}
