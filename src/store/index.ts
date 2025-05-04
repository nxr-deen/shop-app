import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"
import productsReducer from "./slices/productsSlice"
import categoriesReducer from "./slices/categoriesSlice"
import wishlistReducer from "./slices/wishlistSlice"
import ordersReducer from "./slices/ordersSlice"
import addressesReducer from "./slices/addressesSlice"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["wishlist", "addresses"], // Only persist these reducers
}

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  wishlist: wishlistReducer,
  orders: ordersReducer,
  addresses: addressesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
