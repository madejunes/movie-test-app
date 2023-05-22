import { Item } from "@/features/shared/types/item"
import { createSlice } from "@reduxjs/toolkit"

const initialState  = {
  searchQuery: '',
  searchIsLoading: false,
  searchResult: [],
  searchError: null,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    toggleSearchLoadingStatus: (state) => {
      state.searchIsLoading = !state.searchIsLoading
    },
    fetchSearchSuccess: (state, action) => {
      state.searchResult = action.payload
    },
    fetchSearchError: (state, action) => {
      state.searchResult = action.payload
    }
  }
})

export const {
  updateSearchQuery,
  toggleSearchLoadingStatus,
  fetchSearchSuccess,
} = searchSlice.actions

export default searchSlice.reducer