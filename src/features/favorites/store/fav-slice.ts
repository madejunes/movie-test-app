import { Item } from "@/features/shared/types/item"
import { createSlice } from "@reduxjs/toolkit"

type favoritesState = {
  favItem: Item[]
}

const initialState: favoritesState = {
  favItem: []
}

export const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites: (state, action) => {
      const hadItem = state.favItem.find((item) => item.id === action.payload.id);
      if (!hadItem) {
        state.favItem.push({...action.payload})
      }
    },
    removeFvorites: (state, action) => {
      const indexToRemove = state.favItem?.findIndex(item => item.id === action.payload.id)
      state.favItem.splice(indexToRemove, 1)
    }
  }
})

export const {
  addFavorites,
  removeFvorites
} = favSlice.actions

export default favSlice.reducer