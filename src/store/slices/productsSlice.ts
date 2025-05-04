import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../services/api"
import type { Product } from "../../types"

interface ProductsState {
  items: Product[]
  featuredItems: Product[]
  newArrivals: Product[]
  bestSellers: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  featuredItems: [],
  newArrivals: [],
  bestSellers: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/products")
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to fetch products")
  }
})

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/featured")
      return response.data
    } catch (error) {
      return rejectWithValue("Failed to fetch featured products")
    }
  },
)

export const fetchNewArrivals = createAsyncThunk("products/fetchNewArrivals", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/products/new-arrivals")
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to fetch new arrivals")
  }
})

export const fetchBestSellers = createAsyncThunk("products/fetchBestSellers", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/products/best-sellers")
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to fetch best sellers")
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.featuredItems = action.payload
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.newArrivals = action.payload
      })
      .addCase(fetchBestSellers.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.bestSellers = action.payload
      })
  },
})

export default productsSlice.reducer
