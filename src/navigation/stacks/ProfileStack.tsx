import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProfileScreen from "../../screens/main/ProfileScreen"
import EditProfileScreen from "../../screens/main/EditProfileScreen"
import OrderHistoryScreen from "../../screens/main/OrderHistoryScreen"
import OrderDetailsScreen from "../../screens/main/OrderDetailsScreen"
import SettingsScreen from "../../screens/main/SettingsScreen"
import AddressesScreen from "../../screens/main/AddressesScreen"
import PaymentMethodsScreen from "../../screens/main/PaymentMethodsScreen"

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Order History" }} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: "Order Details" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: "Payment Methods" }} />
    </Stack.Navigator>
  )
}
