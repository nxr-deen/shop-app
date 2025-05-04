import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Address } from "../../types"

interface AddressesState {
  items: Address[]
  defaultAddressId: number | null
}

const initialState: AddressesState = {
  items: [],
  defaultAddressId: null,
}

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.items.push(action.payload)
      if (state.items.length === 1 || action.payload.isDefault) {
        state.defaultAddressId = action.payload.id
      }
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.items.findIndex((address) => address.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
        if (action.payload.isDefault) {
          state.defaultAddressId = action.payload.id
        }
      }
    },
    removeAddress: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((address) => address.id !== action.payload)
      if (state.defaultAddressId === action.payload) {
        state.defaultAddressId = state.items.length > 0 ? state.items[0].id : null
      }
    },
    setDefaultAddress: (state, action: PayloadAction<number>) => {
      state.defaultAddressId = action.payload
      state.items = state.items.map((address) => ({
        ...address,
        isDefault: address.id === action.payload,
      }))
    },
  },
})

export const { addAddress, updateAddress, removeAddress, setDefaultAddress } = addressesSlice.actions
export default addressesSlice.reducer
