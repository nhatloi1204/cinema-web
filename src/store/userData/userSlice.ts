import { createSlice } from '@reduxjs/toolkit'
import { fetchProfile, updateProfile } from './userThunk'
import { User } from './userType'

interface UserState {
  user: User | null
  loading: boolean
  isInitialized: boolean
  updating: boolean
  updateError: string | null
}

const initialState: UserState = {
  user: null,
  loading: true,
  isInitialized: false,
  updating: false,
  updateError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null
    },
    clearUpdateError: state => {
      state.updateError = null
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

      // ===== UPDATE PROFILE =====
      .addCase(updateProfile.pending, state => {
        state.updating = true
        state.updateError = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false
        state.user = action.payload
        state.updateError = null
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false
        state.updateError = action.payload || 'Failed to update profile'
      })
  },
})

export const { clearUser, clearUpdateError } = userSlice.actions
export default userSlice.reducer
