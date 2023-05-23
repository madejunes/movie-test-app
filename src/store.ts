import { configureStore } from '@reduxjs/toolkit'
import favReducer from '@/features/favorites/store/fav-slice'

export const store = configureStore({
  reducer: {
    favorites: favReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
