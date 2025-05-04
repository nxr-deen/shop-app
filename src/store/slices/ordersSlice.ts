import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../services/api"
import type { Order } from "../../types"

interface OrdersState {
  items: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/orders")
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to fetch orders")
  }
})

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData: any, { rejectWithValue }) => {
  try {
    const response = await api.post("/orders", orderData)
    return response.data
  } catch (error) {
    return rejectWithValue("Failed to create order")
  }
})

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.items.push(action.payload)
      })
  },
})

export default ordersSlice.reducer
