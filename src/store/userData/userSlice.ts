import { createSlice } from '@reduxjs/toolkit'
import { fetchProfile, logoutUser } from './userThunk'
import { User } from './userType'

interface UserState {
  user: User | null
  loading: boolean
  isInitialized: boolean
}

const initialState: UserState = {
  user: null,
  loading: true,
  isInitialized: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      // ===== FETCH PROFILE =====
      .addCase(fetchProfile.pending, state => {
        state.loading = true
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isInitialized = true
      })
      .addCase(fetchProfile.rejected, state => {
        state.loading = false
        state.user = null
        state.isInitialized = true
      })

      // ===== LOGOUT =====
      .addCase(logoutUser.pending, state => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false
        state.user = null
        state.isInitialized = true
      })
      .addCase(logoutUser.rejected, state => {
        state.loading = false
        state.user = null
        state.isInitialized = true
      })
  },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer
