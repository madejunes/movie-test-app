import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '@/features/search/store/search-slice'
import favReducer from '@/features/favorites/store/fav-slice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
