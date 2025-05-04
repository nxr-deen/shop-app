import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../../screens/main/CartScreen"
import CheckoutScreen from "../../screens/main/CheckoutScreen"
import OrderConfirmationScreen from "../../screens/main/OrderConfirmationScreen"

const Stack = createNativeStackNavigator()

export default function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ title: "Order Confirmation" }}
      />
    </Stack.Navigator>
  )
}
