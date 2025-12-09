import { createSlice } from '@reduxjs/toolkit'
import { fetchProfile, logoutUser } from './userThunk'
import { User } from './userType'

interface UserState {
  user: User | null
  loading: boolean
}

const initialState: UserState = {
  user: null,
  loading: true,
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
      })
      .addCase(fetchProfile.rejected, state => {
        state.loading = false
        state.user = null
      })

      // ===== LOGOUT =====
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
      })
  },
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer
