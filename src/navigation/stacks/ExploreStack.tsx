import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ExploreScreen from "../../screens/main/ExploreScreen"
import ProductDetailsScreen from "../../screens/main/ProductDetailsScreen"
import CategoryScreen from "../../screens/main/CategoryScreen"

const Stack = createNativeStackNavigator()

export default function ExploreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Product Details" }} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  )
}
