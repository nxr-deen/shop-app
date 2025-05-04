import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./src/store"
import RootNavigator from "./src/navigation/RootNavigator"
import { ThemeProvider } from "./src/contexts/ThemeContext"
import { AuthProvider } from "./src/contexts/AuthContext"
import { CartProvider } from "./src/contexts/CartContext"
import { Toast } from "./src/components/Toast"

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <CartProvider>
                <NavigationContainer>
                  <StatusBar style="auto" />
                  <RootNavigator />
                  <Toast />
                </NavigationContainer>
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  )
}
