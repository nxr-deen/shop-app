import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../services/api"
import type { Category } from "../../types"

interface CategoriesState {
  items: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/categories")
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to fetch categories")
  }
})

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default categoriesSlice.reducer
